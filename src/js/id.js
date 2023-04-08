const { v4: uuidv4 } = require('uuid');

module.exports = {
    generate(type, account = null) {
        switch (type) {
            case 'account': return 'ac-' + uuidv4()
            case 'ticket': return 'ti-' + uuidv4()
            case 'attachement': return 'at-' + uuidv4()
            case 'token': return 'to-' + uuidv4() 
            case 'chat': return 'ch-' + uuidv4()
        }
    }
}