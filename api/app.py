from flask import Flask, jsonify, request
import json
from profiles import profiles
app = Flask(__name__)

# Testing Route
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong!'})

# Get Data Routes
@app.route('/profiles')
def getProfiles():
    # res = []
    # fichero = json.load(open('profiles.json'))
    # print(fichero)
    # lineas = fichero.readlines()
    # for linea in lineas:
        # res.append(linea)
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

if __name__ == '__main__':
    app.run(debug=True, port=4000)
