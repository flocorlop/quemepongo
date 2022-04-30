from datetime import datetime
from turtle import title
from flask import Flask, jsonify, request
import json
from profiles import profiles
from logging import exception
# from outfits import outfits
from Models import db, Outfits, Profiles
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy import table, column

#region imports predictions:
import base64
import numpy as np
import io
from PIL import Image
import keras, tensorflow as tf
from keras import backend as K
from keras.models import Sequential
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
#endregion

app = Flask(__name__)

#config bbdd
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///C:\\bbdd_tfg\\melopongo.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


# Testing Route
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong!'})

#region Profiles
# Get Data Routes
@app.route('/profiles')
def getProfiles():
    profiles = Profiles.query.all()
    profiles = [o.serialize() for o in profiles]
    return jsonify(profiles), 200


@app.route('/profiles/<string:username>')
def getProfile(username):
    try:
        profile = Profiles.query.filter_by(username=username).first()
        if not profile:
            return jsonify({"msg": "Este perfil no existe"}), 404
        else:
            return jsonify(profile.serialize()),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Ha ocurrido un error"}), 500 

@app.route('/profiles/id/<string:id>')
def getProfileId(id):
    try:
        profile = Profiles.query.filter_by(id=id).first()
        if not profile:
            return jsonify({"msg": "Este perfil no existe"}), 404
        else:
            return jsonify(profile.serialize()),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Ha ocurrido un error"}), 500 


# Create Data Routes
@app.route('/profiles', methods=['POST'])
def addProfile():
    user = [
        u for u in profiles if u['username'] == request.json['username']]
    if (len(user) == 0):
        new_profile = {
            'name': request.json['name'],
            'username': request.json['username'],
            'email': request.json['email']
        }
        profiles.append(new_profile)
        return jsonify(profiles)
    return jsonify({'message': 'Profile exists yet.'})

# Update Data Route
@app.route('/profiles/<string:username>', methods=['PUT'])
def editProfile(username):
    userFound = [u for u in profiles if u['username'] == username]
    if (len(userFound) > 0):
        userFound[0]['name'] = request.json['name']
        userFound[0]['email'] = request.json['email']
        return jsonify({
            'message': 'Profile Updated',
            'profile': userFound[0]
        })
    return jsonify({'message': 'Profile Not found'})

# DELETE Data Route
@app.route('/profiles/delete/<string:id>',methods=['DELETE'])
def deleteProfile(id):
    try:
        profiles = Profiles.query.all()
        p = Profiles.query.filter_by(id=id).first()
        if not p:
            return jsonify({"msg": "Este outfit no existe"}), 404
        else:
            db.session.delete(p)
            db.session.commit()
            print("borrado profile")
            profiles = Outfits.query.all()
            profiles = [o.serialize() for o in profiles]
            return jsonify(profiles),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Error al borrar el outfit"}), 500     
#endregion


#region Outfits
@app.route("/outfits")
def getOutfits():
    outfits = Outfits.query.all()
    outfits = [o.serialize() for o in outfits]
    return jsonify(outfits), 200

@app.route('/outfits/<string:id>',methods=['GET'])
def getOutfit(id):
    try:
        outfit = Outfits.query.filter_by(id=id).first()
        if not outfit:
            return jsonify({"msg": "Este outfit no existe"}), 404
        else:
            return jsonify(outfit.serialize()),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Ha ocurrido un error"}), 500            

# @app.route('/outfits/<string:id>/edit',methods=['UPDATE'])
# def editOutfit(id):
#     try:
#         print("aqui editar")
#         outfit = Outfits.query.filter_by(id=id).first()
#         if not outfit:
#             return jsonify({"msg": "Este outfit no existe"}), 404
#         else:
#             return jsonify(outfit.serialize()),200
#     except Exception:
#         exception("[SERVER]: Error ->")
#         return jsonify({"msg": "Ha ocurrido un error"}), 500            

@app.route('/outfits/delete/<string:id>',methods=['DELETE'])
def deleteOutfit(id):
    try:
        outfits = Outfits.query.all()
        outfit = Outfits.query.filter_by(id=id).first()
        if not outfit:
            return jsonify({"msg": "Este outfit no existe"}), 404
        else:
            db.session.delete(outfit)
            db.session.commit()
            print("borrado outfit")
            outfits = Outfits.query.all()
            outfits = [o.serialize() for o in outfits]
            return jsonify(outfits),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Error al borrar el outfit"}), 500            

@app.route("/outfits/new-outfit/save", methods=["POST"])
def saveOutfit():
    try:
        dataReceived = request.get_json(force=True)
        id = Outfits.query.count() +1
        percentage = dataReceived[0]["percentage"]
        title = dataReceived[0]["title"]
        photo = dataReceived[0]["image_encoded"]
        description = dataReceived[0]["description"]
        
        newOutfit = Outfits(id,percentage,title,photo,description)
        db.session.add(newOutfit)
        db.session.commit()
        print("nuevo outfit")
        return jsonify(newOutfit.serialize()) , 201
    except Exception:
        exception("\n[SERVER]: Error adding outfit. Log: \n")
        return jsonify({"msg": "Error al guardar outfit"}), 500

@app.route("/outfits/edit/save", methods=["POST"])
def saveEditOutfit():
    try:
        dataReceived = request.get_json(force=True)
        id = dataReceived[0]["id"]
        newT = dataReceived[0]["title"]
        newDesc = dataReceived[0]["description"]
        
        itemOutfit = Outfits.query.filter_by(id=id).first()
        itemOutfit.title = newT
        itemOutfit.description = newDesc
        db.session.commit()
        print("outfit editado")
        return jsonify(itemOutfit.serialize()) , 200
    except Exception:
        exception("\n[SERVER]: Error editing outfit. Log: \n")
        return jsonify({"msg": "Error al guardar outfit"}), 500
#endregion


#region Model y predictions
def get_model():
    global model
    model = load_model('modelft_outfits.h5')
    print(" Model loaded")

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    print("image preprocessed")
    return image

print ("Loading keras model")
get_model()

@app.route("/outfits/new-outfit/predict", methods=["POST"])
def predict():
    datasent = request.get_json(force=True)
    encoded = datasent[0]['image_encoded']
    encodedImg= encoded.partition(",")[2]
    encodedTypeImg = encoded.partition(",")[0]
    #typeImg = guess_all_extensions(guess_type(encodedTypeImg)[0])
    if (encodedTypeImg == "data:image/jpeg;base64"):
        typeImg = ".jpeg"
        decoded = base64.b64decode(encodedImg)
        image = Image.open(io.BytesIO(decoded))
        processed_image = preprocess_image(image, (160,160))
        prediction = model.predict(processed_image).tolist()
        percentage = prediction[0][0]
        percentage01 = tf.nn.sigmoid(percentage).numpy()
        percentage01 = float(percentage01*100)
        
        print("prediction de 0 a 1: " + str(percentage01))
        response = {
            'prediction': {"res": percentage01}
        }
        
        return jsonify(response)
    else:
        raise Exception()

#endregion


if __name__ == '__main__':
    app.run(debug=True, port=4000)

