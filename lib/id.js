const { v4: uuidv4 } = require('uuid');

module.exports = {
    generate(type, account = null) {
        switch (type) {
            case 'account': return 'a-' + uuidv4()
            case 'wallet': return 'w-' + uuidv4()
            case 'currency': return 'c-' + uuidv4()
            case 'token': return `${account}.${uuidv4()}` 
        }
    }
}