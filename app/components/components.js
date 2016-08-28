var FooterModule = require('./footer/footer'),
    MessagesModule = require('./messages/messages'),
    PageDataModule = require('./page-data/page-data'),
    SearchModule = require('./search/search'),
    TopNavModule = require('./top-nav/top-nav'),
    ViewHelpersModule = require('./view-helpers/view-helpers');


/**
 * Definition for the Components module.
 */
module.exports = angular.module('awesomeness.components', [
  FooterModule.name,
  MessagesModule.name,
  PageDataModule.name,
  SearchModule.name,
  TopNavModule.name,
  ViewHelpersModule.name
]);
