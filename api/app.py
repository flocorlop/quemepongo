from flask import Flask, jsonify, request

app = Flask(__name__)

from profiles import profiles

# Testing Route
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong!'})

# Get Data Routes
@app.route('/profiles')
def getProfiles():
    # return jsonify(products)
    return jsonify({'profiles': profiles})


@app.route('/profiles/<string:username>')
def getProfile(username):
    user = [
        u for u in profiles if u['username'] == username]
    if (len(user) > 0):
        return jsonify({'profile': user[0]})
    return jsonify({'message': 'Profile Not found'})

# Create Data Routes
# @app.route('/products', methods=['POST'])
# def addProduct():
#     new_product = {
#         'name': request.json['name'],
#         'price': request.json['price'],
#         'quantity': 10
#     }
#     products.append(new_product)
#     return jsonify({'products': products})

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
