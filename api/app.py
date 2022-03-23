from flask import Flask, jsonify, request
import json
from profiles import profiles
from outfits import outfits
from Models import db, Outfits
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

#endregion
if __name__ == '__main__':
    app.run(debug=True, port=4000)
