var CTS = CTS || {};

CTS.Dojos = {
    init : function () {
        this.bindActions();
        this.getDojos();
    },
    bindActions : function () {
        var self = this;
        // setNewDojo
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewDojo();
        });
    },
    getDojos : function () {
        var i = 0;
        jQuery.ajax({
            type: "GET",
            url: "api/dojo/getDojo.php",
            cache: false,
            success: function (list) {
                $('#listPanel').empty();
                $('#infoDojos').text('Dojos: '+list.length);
                for (i; i < list.length; i++) {
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].environment + ' - ' + list[i].name + ' - ' + list[i].city + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Environment: ' + list[i].environment +'</div>'
                        +'<div class="list-group-item small">Name: ' + list[i].name +'</div>'
                        +'<div class="list-group-item small">Country: ' + list[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + list[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + list[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                        +'<div class="list-group-item small">Description: ' + list[i].description +'</div>'
                        +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                        +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                        +'<div class="list-group-item small">Opening: ' + list[i].opening_date +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" href="dojo.html?name_dojo=' + list[i].name + '&id_dojo=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojos.editDojo(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editDojo : function (id) {
        this.setModalDojo('Edit Dojo', id);
        CTS.Utils.showModal('modalEditDojo');
        this.setDojo(id);
    },
    setModalDojo : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Dojos.saveDojo(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Dojos.newDojo();">Save changes</button>';

        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditDojo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="environment" class="col-sm-2 control-label">Environment</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="environment" id="environment"></select></div></div>'
            +'              <div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="country" class="col-sm-2 control-label">Country</label><div class="col-sm-10"><input id="country" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="state" class="col-sm-2 control-label">State</label><div class="col-sm-10"><input id="state" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="city" class="col-sm-2 control-label">City</label><div class="col-sm-10"><input id="city" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="address" class="col-sm-2 control-label">Address</label><div class="col-sm-10"><input id="address" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="description" class="col-sm-2 control-label">Description</label><div class="col-sm-10"><input id="description" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="phone" class="col-sm-2 control-label">Phone</label><div class="col-sm-10"><input id="phone" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="email" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input id="email" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="facebook" class="col-sm-2 control-label">Facebook</label><div class="col-sm-10"><input id="facebook" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="twitter" class="col-sm-2 control-label">Twitter</label><div class="col-sm-10"><input id="twitter" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="opening_date" class="col-sm-2 control-label">Opening</label><div class="col-sm-10"><input id="opening_date" type="date" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="status" class="col-sm-2 control-label">Status</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="status" id="status"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
    },
    setDojo : function (id) {
        var id = {
                id_dojo: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/getDojo.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (atr) {
                CTS.Utils.getEnvironment(atr[0].id_environment,'environment');
                $("#name").val(atr[0].name);
                $("#country").val(atr[0].country);
                $("#state").val(atr[0].state);
                $("#city").val(atr[0].city);
                $("#address").val(atr[0].address);
                $("#description").val(atr[0].description);
                $("#phone").val(atr[0].phone);
                $("#email").val(atr[0].email);
                $("#facebook").val(atr[0].facebook);
                $("#twitter").val(atr[0].twitter);
                $("#opening_date").val(atr[0].opening_date);
                CTS.Utils.setStatus(atr[0].id_status,'status');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveDojo : function (id) {
        var dojo = {
                id_dojo: id,
                id_environment: $("#environment").val(),
                name: $("#name").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
                address: $("#address").val(),
                description: $("#description").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                opening_date: $("#opening_date").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/updateDojo.php",
            data: JSON.stringify(dojo),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue editado correctamente");
                CTS.Utils.closeModal('modalEditDojo');
                CTS.Dojos.getDojos();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewDojo : function () {
        this.setModalDojo('New Dojo', null);
        CTS.Utils.showModal('modalEditDojo');
        CTS.Utils.getEnvironment(null,'environment');
        CTS.Utils.setStatus(null,'status');
    },
    newDojo : function () {
        var dojo = {
                id_environment: $("#environment").val(),
                name: $("#name").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
                address: $("#address").val(),
                description: $("#description").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                opening_date: $("#opening_date").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/newDojo.php",
            data: JSON.stringify(dojo),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue creado correctamente.");
                CTS.Utils.closeModal('modalEditDojo');
                CTS.Dojos.getDojos();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Dojos.init();
});