import flask
from jinja2 import Undefined
import pyodbc
from flask import  request, jsonify
from flask_cors import CORS, cross_origin
import json
import uuid
from zmq import NULL

server = 'LOCALHOST'
database = 'test_dream_snapshot'

print("connecting.......")
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + '; DATABASE='+database+'; TRUSTED_CONNECTION=yes')
cursor = cnxn.cursor()
print("connected!")

app = flask.Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

## helper functions #######
def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False
    
############################

@app.route('/')
@cross_origin()
def home():
    return {}

@app.route('/modeltree/<int:modelid>', methods=['GET']) # only model 13 exists for now (fundamental equity 2)
@cross_origin()
def modeltree(modelid):
    cursor.execute('[lib_Snapshot].[stp_GetSnapshotModelRepresentationJson] @ModelId = ?', modelid )
    rv = cursor.fetchall()
    return str(rv[0])

#<string:username>/<string:password>
@app.route('/checkuserin', methods=['GET','POST']) # should get the username and password from the request header
@cross_origin()
def checkuserin():
    json_request_data = request.json
    username = json_request_data["username"]
    password = json_request_data["password"]
    
    cursor.execute('[lib_Snapshot].[stp_AuthenticateUser] @UserName = ?, @Password = ?',username, password )
    rv = cursor.fetchall()
    
    json_data=[]
    json_data.append(dict(zip(["name","token"],list(rv[0]))))
     
    if(is_valid_uuid(list(rv[0])[1])):
        json_data[0]["status"] = "success"
    return jsonify(json_data)

@app.route('/allmodels', methods=['POST']) # only model 13 exists for now (fundamental equity 2)
@cross_origin()
def allmodels():
    request_text = request.data.decode('utf-8')
    json_request_data = json.loads(request_text)
    
    if (json_request_data["token"] in ['null',"",'undefined']):
        cursor.execute('[lib_Snapshot].[stp_AllModelsGet] NULL')    
    else:
        usertoken = json_request_data["token"]
        cursor.execute('[lib_Snapshot].[stp_AllModelsGet] @UserToken = ?', usertoken)
    
    rv = cursor.fetchall()
    json_data=[]
    row_headers = ["ModelId","Name", "Status", "Category"]
 
    for result in rv:
        res = list(result)
        json_data.append(dict(zip(row_headers, res)))
    return jsonify(json_data)

@app.route('/nodesbylevel', methods=['GET','POST']) # get all nodes for a specific level
@cross_origin()
def nodesbylevel():
    request_text = request.data.decode('utf-8')
    json_request_data = json.loads(request_text)
    level = json_request_data["level"]
    cursor.execute('[lib_Snapshot].[stp_NodesByLevel_Get] @Level = ?',int(level) )
    
    rv = cursor.fetchall()
    json_data=[]
    row_headers = ["NodeId", "Name"]
    
    for result in rv:
        res = list(result)
        json_data.append(dict(zip(row_headers, res)))
    return jsonify(json_data)


@app.route('/models', methods=['GET']) # only model 13 exists for now (fundamental equity 2)
@cross_origin()
def models():
    cursor.execute('[lib_Snapshot].[stp_ModelsGet]')
    rv = cursor.fetchall()
    json_data=[]
    row_headers = ["Id","Name", "Category"]

    for result in rv:
        res = list(result) + ["SnapshotModels"]
        json_data.append(dict(zip(row_headers, res)))
    return jsonify(json_data)

# NodeTitle, Parent, Weight, Wordingtype, Wording where *Wordingtype is either single or double
@app.route('/modelnodeinformation', methods=['POST'])
@cross_origin()
def modelnodeinformation():
    request_text = request.data.decode('utf-8')
    json_request_data = json.loads(request_text)
    ModelId = json_request_data["ModelId"]
    NodeId  = json_request_data["NodeId"]
    
    if(ModelId in ['null','undefined',''] or NodeId in ['null','undefined','']):
        return {}
    
    cursor.execute('[lib_Snapshot].[stp_GetModelNodeInformation] @ModelId = ?, @NodeId = ?',
                    ModelId, NodeId)
    rv = cursor.fetchall()
        
    json_response=list(rv[0])[0]
    return json_response
 
@app.route('/userAuthenticated', methods=['GET'])
@cross_origin()
def checkUserAuthentication():
    request_text = request.data.decode('utf-8')
    json_request_data = json.loads(request_text)
    UserToken = json_request_data["UserToken"]
    cursor.execute('[lib_Snapshot].[stp_AuthenticatedUser_Check] @UserToken = ?', UserToken)
    rv = cursor.fetchall()
    
    json_response=list(rv[0])[0]
    return json_response

@app.route('/modelrepresentationjson', methods=['POST'])
@cross_origin()
def modelrepresentationjson():
    request_text = request.data.decode('utf-8')
    json_request_data = json.loads(request_text)
    ModelId = json_request_data["ModelId"]
    UserToken = json_request_data["UserToken"]
    ModelCategory = json_request_data["ModelCategory"]
    if(ModelId == 'null' or ModelId == 'undefined'):
        return {}
    
    cursor.execute('[lib_Snapshot].[stp_GetModelTreeRepresentationJson] @ModelId = ?, @UserToken = ?, @ModelCategory = ?',
                    ModelId, UserToken, ModelCategory)
    rv = cursor.fetchall()
        
    json_response=list(rv[0])[0]
    return json_response
 
 
# note = the assumption is that the react server app checks the user is authenticated then hands the userid to the api
# the userid and uniqueidentifier are stored (in chrome local storage (not ideal) or server user context)
@app.route('/usermodels/<int:UserKey>', methods=['GET'])
@cross_origin()
def usermodels(UserKey):
    cursor.execute('[lib_Snapshot].[stp_UserModelsGet]  @UserId = ?', UserKey)
    rv = cursor.fetchall()
    json_data=[]
    row_headers = ["Id","Name","Category"]

    for result in rv:
        res = list(result) + ["MyModels"]
        json_data.append(dict(zip(row_headers, res)))
    return jsonify(json_data)

if __name__ == "__main__":
    # app.run( port=5000)
    app.run( port=4000, debug=False) # works with POSTMAN and debug as PYTHON FILE