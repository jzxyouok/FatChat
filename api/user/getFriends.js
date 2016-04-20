module.exports = function (req, res, next) {
	var db = require('../../lib/mydb.js');
	var makeSessionID = require('../../lib/makeSessionID.js');
	var querystring = require('querystring');
	var params = querystring.parse(req._parsedUrl.query);
	var cookie = req.cookie;
	var friends = [];
	var ids;

	if ( ! (cookie.s && params.uid) ) {
		return res.responseJSONP({status: 'ok', success: false, msg: 'auth fail or bad arguments'});
	}

	db.query('SELECT id, avatar, gender, nickname FROM users WHERE id IN '+
		'(SELECT friend_id FROM friendship WHERE user_id=' + db.escape(params.uid) + ')', function (err, body) {
		if (err) {
			return res.responseJSONP({status: 'ok', success: false, msg: 'server error'});
		}
		res.responseJSONP({status: 'ok', success: true, msg: body});
	} );
}