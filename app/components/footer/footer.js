var FooterController = require('./footer-controller'),
    footerDirective = require('./footer-directive');


/**
 * Definition for the Footer module.
 */
module.exports = angular.module('awesomeness.components.footer', []).
    controller('FooterController', FooterController).
    directive('footer', footerDirective);
