from flask import Flask, jsonify, request
import json
from profiles import profiles
from outfits import outfits
from Models import db, Outfits

#region imports predictions:
import base64
import numpy as np
import io
from PIL import Image
import keras
from keras import backend as K
from keras.models import Sequential
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
#endregion

app = Flask(__name__)

#config bbdd
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///C:\\bbdd_tfg\\outfits.db"
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
    return jsonify(profiles)


@app.route('/profiles/<string:username>')
def getProfile(username):
    user = [
        u for u in profiles if u['username'] == username]
    if (len(user) > 0):
        return jsonify(user[0])
    return jsonify({'message': 'Profile Not found'})

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
@app.route('/profiles/<string:username>', methods=['DELETE'])
def deleteProfile(username):
    userFound = [u for u in profiles if u['username'] == username]
    if len(userFound) > 0:
        profiles.remove(userFound[0])
        return jsonify({
            'message': 'Profile Deleted',
            'profiles': profiles
        })
#endregion


#region Outfits
@app.route("/outfits")
def getOutfits():
    outfits = Outfits.query.all()
    outfits = [o.serialize() for o in outfits]
    return jsonify(outfits)

@app.route('/outfits/<string:id>',methods=['GET'])
def getOutfit(id):
    try:
        outfit = Outfits.query.filter_by(rowid=id).first()
        if not outfit:
            return jsonify({"msg": "Este outfit no existe"}), 200
        else:
            return jsonify(outfit.serialize()),200
    except Exception:
        exception("[SERVER]: Error ->")
        return jsonify({"msg": "Ha ocurrido un error"}), 500            


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
    #me llega formdata
    
    datasent = request.get_json(force=True)
    encoded = datasent[0]['image_encoded']
    encoded= encoded.partition(",")[2]
    print(encoded)
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, (160,160))

    prediction = model.predict(processed_image).tolist()

    response = {
        'prediction': {
            'res': prediction[0][0]
        }
    }
    
    return jsonify(response)

#endregion


if __name__ == '__main__':
    app.run(debug=True, port=4000)

