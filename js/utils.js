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
            url: "api/getStatus.php",
            cache: false,
            success: function (listStatus) {
                $('#'+selectName).empty();

                for (var i=0;i<listStatus.length;i++) {
                    $('#'+selectName).append('<option value='  + listStatus[i].id +'>' + listStatus[i].name +'</option>');
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
            success: function (listCategory) {
                $('#'+selectName).empty();

                for (var i=0;i<listCategory.length;i++) {
                    $('#'+selectName).append('<option value='  + listCategory[i].id +'>' + listCategory[i].name +'</option>');
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
    }
};