/*
 * Suite de herramientas para trabajar con ISBN10 e ISBN13
 * Autor: upadrian@gmail.com
 * Fecha: 7-2-2014
 * 
 * 
 * */
var isbnTools = function() {
    var isbnTools = this;
    this.errorcode = 0;
    this.errormsg = null;

    function calculate() {
        this.ISBN10digit = function(isbn9) {
            var csumTotal = 0;
            for (charPos = 0; charPos <= 8; charPos++)
                csumTotal = csumTotal + ((charPos + 1) * parseInt(isbn9.substring(charPos, charPos + 1)));
            var remainder = csumTotal - parseInt(csumTotal / 11) * 11;
            return String((remainder == 10)?'X':remainder)

        }
        this.ISBN13digit = function(isbn12) {
            var csumTotal = 0;
            for (charPos = isbn12.length - 1; charPos >= 0; charPos--) {
                if (charPos / 2 == parseInt(charPos / 2))
                    csumTotal = csumTotal + (parseInt(isbn12.substring(charPos, charPos + 1)));
                else
                    csumTotal = csumTotal + (3 * parseInt(isbn12.substring(charPos, charPos + 1)));
            }
            var remainder = csumTotal - parseInt(csumTotal / 10) * 10;
            return ((remainder == 0))?'0':String(10 - remainder);
        }
    }

    function check() {
        this.isbn10 = function(isbn) {}
        this.isbn13 = function(isbn) {}
    }

    function is() {
        this.isbn10 = function(isbn) {
            return (isbn.length == 10);
        }
        this.isbn13 = function(isbn) {
            return (isbn.length == 13);
        }
        this.validISBN10 = function(isbn) {
            var digit = isbnTools.getDigit(isbn);
            isbn = isbnTools.getISBNwithoutDigit(isbn);
            return (digit == isbnTools.calculate.ISBN10digit(isbn));
        }
        this.validISBN13 = function(isbn) {
            var digit = isbnTools.getDigit(isbn);
            isbn = isbnTools.getISBNwithoutDigit(isbn);
            return (digit == isbnTools.calculate.ISBN13digit(isbn));
        }
    }

    function convert(isbn) {
        this.byGuess = function(isbn) {
            if (isbnTools.loadISBN(isbn)) {
                if (isbnTools.is.isbn10(isbn)){
                    if(!isbnTools.is.validISBN10(isbn))
                        return isbnTools.error(2,"El isbn10 ingresado no es correcto");
                    return isbnTools.convert.isbn10to13(isbn);
                } else if(isbnTools.is.isbn13(isbn)){
                    if(!isbnTools.is.validISBN13(isbn))
                        return isbnTools.error(3,"El isbn13 ingresado no es correcto");
                    return isbnTools.convert.isbn13to10(isbn);
                }
            } else
                return false;
        }
        this.isbn10to13 = function(isbn10) {
            isbn12 = '978' + isbnTools.getISBNwithoutDigit(isbn10);
            return isbn12 + isbnTools.calculate.ISBN13digit(isbn12); //retorna isbn13
        }
        this.isbn13to10 = function(isbn13) {
            var isbn12 = isbnTools.getISBNwithoutDigit(isbn13)
            var isbn9 = isbn12.substr(3, 9);
            return isbn9 + isbnTools.calculate.ISBN10digit(isbn9); //retorna isbn10
        }
    }

    function parse() {
        this.removeDigit = function(isbn) {}
        this.cleanIsbn = function(isbn) {
            return isbn.replace(/[^\dX]/gi, "");
        }
    }
    this.getDigit = function(isbn) {
        return isbn.substr(isbn.length - 1, 1);
    }
    this.getISBNwithoutDigit = function(isbn) {
        return isbn.substr(0, isbn.length - 1);
    }
    this.loadISBN = function(isbn) {
        isbn = isbnTools.parse.cleanIsbn(isbn);
        if (isbn.length != 10 && isbn.length != 13) return isbnTools.error(1, "El isbn no es correcto en su longitud.");
        return true;
    }
    this.error = function(errorcode, errormsg) {
        isbnTools.errorcode = errorcode;
        isbnTools.errormsg = errormsg;
        try {
            console.debug(errormsg)
        } catch (e) {}
        return false;
    }
    this.calculate = new calculate();
    this.check = new check();
    this.is = new is();
    this.convert = new convert();
    this.parse = new parse();
}
var isbnTools = new isbnTools();