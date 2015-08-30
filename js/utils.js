var CTS = CTS || {};

CTS.Utils = {
    showDialog : function (type,title,msg) {
        BootstrapDialog.show({
            type : type,
            title : title,
            message : msg
        });
    },
    setStatus : function (id,selectName) {
        var self = this;
        jQuery.ajax({
            type: "GET",
            url: "api/status/getStatus.php",
            cache: false,
            success: function (list) {
                $('#'+selectName).empty();

                for (var i=0;i<list.length;i++) {
                    $('#'+selectName).append('<option value='  + list[i].id +'>' + list[i].name +'</option>');
                }
                $('#'+selectName).select2();
                if (id)
                    $('#'+selectName).val(id).trigger("change");
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getCategories : function (id,selectName) {
        var self = this;
        jQuery.ajax({
            type: "GET",
            url: "api/project/getCategory.php",
            cache: false,
            success: function (list) {
                $('#'+selectName).empty();

                for (var i=0;i<list.length;i++) {
                    $('#'+selectName).append('<option value='  + list[i].id +'>' + list[i].name +'</option>');
                }
                $('#'+selectName).select2();
                if (id)
                    $('#'+selectName).val(id).trigger("change");
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getSkills : function (id,selectName) {
        var self = this;
        jQuery.ajax({
            type: "GET",
            url: "api/skill/getSkill.php",
            cache: false,
            success: function (list) {
                $('#'+selectName).empty();

                for (var i=0;i<list.length;i++) {
                    $('#'+selectName).append('<option value='  + list[i].id +'>' + list[i].name +'</option>');
                }
                $('#'+selectName).select2();
                if (id)
                    $('#'+selectName).val(id).trigger("change");
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getEnvironment : function (id,selectName) {
        var self = this;
        jQuery.ajax({
            type: "GET",
            url: "api/dojo/getEnvironment.php",
            cache: false,
            success: function (list) {
                $('#'+selectName).empty();

                for (var i=0;i<list.length;i++) {
                    $('#'+selectName).append('<option value='  + list[i].id +'>' + list[i].name +'</option>');
                }
                $('#'+selectName).select2();
                if (id)
                    $('#'+selectName).val(id).trigger("change");
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getURLParameter : function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    },
    closeModal : function (id) {
      	$('#'+id).modal('hide');
    },
    showModal : function (id) {
      	$('#'+id).modal('show');
    },
    calculateAge : function (birthDate) {
        birthDate = new Date(birthDate);
        otherDate = new Date();
        var years = (otherDate.getFullYear() - birthDate.getFullYear());
        if (otherDate.getMonth() < birthDate.getMonth() || 
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }
        return years;
    },
    getAvg : function (values) {
      return values.reduce(function (p, c) {
        return p + c;
      }) / values.length;
    }
};