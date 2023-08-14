//the url will be something linke /api/user-info/?query=[f_name,uearn_coins]
//get the search parameter named query using "req.query['query']" it will be an serialized array if no query parameter is found respond invalid request
//query parameter will be an array (check if it is actually a valid array) check all the elements on the fields in User mongoose model remove the elements from array if it does not exists
//get u_uid from request  => req['uid']
//make a findone request using mongoose with mongoose search parameter _id ,  use projection to only get the fields that is in the array

export default function GetUserInfo(req, res) {}
