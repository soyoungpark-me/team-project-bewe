const crypto = require('crypto');

/*******
 * 난수 생성 함수
 * @returns {string}
 */
const randomString = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const stringLength = 8;
  let randomString = '';
  for (let i=0; i<stringLength; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum,rnum+1);
  }
  return randomString;
};


/*************
 * Crypto
 *************/
exports.doCypher = (inputpass, salt) => {
  const ranString = randomString();
  const _salt = typeof salt !== 'undefined' ? salt: ranString;

  // console.log('_salt: ', _salt);
  // console.log('salt: ', salt);
  // console.log('ranString: ',  ranString);

  const iterations = 100;
  const keylen = 24;

  const derivedKey = crypto.pbkdf2Sync(inputpass, _salt, iterations, keylen, 'sha512');
  const pw = Buffer(derivedKey, 'binary').toString('hex');

  const result = { pw, _salt };
  return result;
};

/*************
 * jwt
 *************/
exports.jwt = {
  cert: "aksguraksgur"
};


/**********
 * NODEMAILER SETTING
 */
exports.adminMail = {
  service: 'gmail',
  auth: {
    user: 'TeamDoodle@gmail.com',
    pass: 'ekdtlsdmlwjstl'
  }
};


