define([
        'Backbone',
        'models/ApplicationsModel',
        'common',
        'constants'
    ],
    function (Backbone, ApplicationModel, common, CONSTANTS) {
        'use strict';
        var ApplicationsCollection = Backbone.Collection.extend({
            model: ApplicationModel,
            url  : function () {
                return CONSTANTS.URLS.APPLICATIONS;
            },

            parse: function (response) {
                if (response.data) {
                    _.map(response.data, function (application) {

                        application.creationDate = common.utcDateToLocaleDate(application.creationDate);
                        if (application.nextAction) {
                            application.nextAction = common.utcDateToLocaleDate(application.nextAction);
                        }
                        if (application.createdBy) {
                            application.createdBy.date = common.utcDateToLocaleDateTime(application.createdBy.date);
                        }
                        if (application.editedBy) {
                            application.editedBy.date = common.utcDateToLocaleDateTime(application.editedBy.date);
                        }
                        return application;
                    });
                }
                return response.data;
            }
        });
        return ApplicationsCollection;
    });
