var CTS = CTS || {};

CTS.Responsibles = {
    init : function () {
        this.bindActions();
        this.getResponsibles();
    },
    bindActions : function () {
        var self = this;
        // setNewResponsible
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewResponsible();
        });
    },
    getResponsibles : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/responsible/getResponsible.php",
            cache: false,
            success: function (list) {
                    $('#listPanel').empty();

                    for (var i=0;i<list.length;i++) {
                        var padawans = '';
                        for (var j=0;j<list[i].padawans.length;j++) {
                            if ((j+1)==list[i].padawans.length)
                                padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>';
                            else
                                padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>, ';
                        }
                        $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                            +'<div id="' + list[i].id +'" class="sublinks collapse">'
                            +'<div class="list-group-item small">DNI: ' + list[i].dni +'</div>'
                            +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                            +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                            +'<div class="list-group-item small">Mobile: ' + list[i].mobile +'</div>'
                            +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                            +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                            +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                            +'<div class="list-group-item small">Padawans: ' + padawans +'</div>'
                            +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                            +'<a class="list-group-item" href="responsible.html?id_responsible=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                            +'<a class="list-group-item" onclick="CTS.Responsibles.editResponsible(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                            +'<a class="list-group-item" onclick="CTS.Responsibles.addPadawanResponsible(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-plus"></span> Add Padawan</a>'
                            +'</div>');
                    }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editResponsible : function (id) {
        this.setModalResponsible('Edit Responsible', id);
        CTS.Utils.showModal('modalEditResponsible');
        this.setResponsible(id);
    },
    setModalResponsible : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Responsibles.saveResponsible(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Responsibles.newResponsible();">Save changes</button>';

        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditResponsible" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="lastname" class="col-sm-2 control-label">Lastname</label><div class="col-sm-10"><input id="lastname" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="dni" class="col-sm-2 control-label">DNI</label><div class="col-sm-10"><input id="dni" type="number" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="phone" class="col-sm-2 control-label">Phone</label><div class="col-sm-10"><input id="phone" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="mobile" class="col-sm-2 control-label">Mobile</label><div class="col-sm-10"><input id="mobile" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="email" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input id="email" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="facebook" class="col-sm-2 control-label">Facebook</label><div class="col-sm-10"><input id="facebook" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="twitter" class="col-sm-2 control-label">Twitter</label><div class="col-sm-10"><input id="twitter" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="address" class="col-sm-2 control-label">Address</label><div class="col-sm-10"><input id="address" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="status" class="col-sm-2 control-label">Status</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="status" id="status"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
    },
    setResponsible : function (id) {
        var id = {
                id_responsible: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/getResponsible.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (atr) {
                $("#name").val(atr[0].name);
                $("#lastname").val(atr[0].lastname);
                $("#dni").val(atr[0].dni);
                $("#phone").val(atr[0].phone);
                $("#mobile").val(atr[0].mobile);
                $("#email").val(atr[0].email);
                $("#facebook").val(atr[0].facebook);
                $("#twitter").val(atr[0].twitter);
                $("#address").val(atr[0].address);
                CTS.Utils.setStatus(atr[0].id_status,'status');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveResponsible : function (id) {
        var responsible = {
                id_responsible: id,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                address: $("#address").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/updateResponsible.php",
            data: JSON.stringify(responsible),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Responsable fue editado correctamente");
                CTS.Utils.closeModal('modalEditResponsible');
                CTS.Responsibles.getResponsibles();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewResponsible : function () {
        this.setModalResponsible('New Responsible', null);
        CTS.Utils.showModal('modalEditResponsible');
        CTS.Utils.setStatus(null,'status');
    },
    newResponsible : function () {
        var responsible = {
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                address: $("#address").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/newResponsible.php",
            data: JSON.stringify(responsible),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Responsable fue creado correctamente.");
                CTS.Utils.closeModal('modalEditResponsible');
                CTS.Responsibles.getResponsibles();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawanResponsible : function (id_responsible) {
        this.setModalAddPadawan('Add Padawan',id_responsible);
        CTS.Utils.showModal('modalAddPadawan');
        this.setPadawans();
    },
    setModalAddPadawan : function (title,id_responsible){
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddPadawan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawans" class="col-sm-2 control-label">Padawans</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="padawans" id="padawans"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Responsibles.addPadawan(\'' + id_responsible + '\');">Add Padawan</button>'
            +'      </div>');
    },
    setPadawans : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/padawan/getPadawan.php",
            cache: false,
            success: function (list) {
                $('#padawans').empty();

                for (var i=0;i<list.length;i++) {
                    $('#padawans').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#padawans").select2();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function (id_responsible) {
        var ids = {
                id_responsible: id_responsible,
                padawans: $("#padawans").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Utils.closeModal('modalAddPadawan');
                CTS.Responsibles.getResponsibles();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Responsibles.init();
});