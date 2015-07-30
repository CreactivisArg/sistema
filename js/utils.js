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
                    var selected = "";
                    
                    if (id==listStatus[i].id)
                        selected = "selected";

                    $('#'+selectName).append('<option '+ selected +'  value='  + listStatus[i].id +'>' + listStatus[i].name +'</option>');
                }
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });    
    },
    getCategories : function (selectName) {
        var self = this;
        jQuery.ajax({
            type: "GET",
            url: "api/getCategory.php",
            cache: false,
            success: function (listCategory) {        
                $('#'+selectName).empty();
                 
                for (var i=0;i<listCategory.length;i++) {
                    $('#'+selectName).append('<option value='  + listCategory[i].id +'>' + listCategory[i].name +'</option>');
                }
                $('#'+selectName).select2();
            },
            error: function () {
                self.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });    
    },
    getURLParameter : function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
};