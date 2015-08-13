var CTS = CTS || {};

CTS.Responsible = {
    id_responsible : '',
    responsible : {},
    init : function () {
        this.id_responsible = CTS.Utils.getURLParameter('id_responsible');
        this.bindActions();
        this.getResponsible();
    },
    bindActions : function () {
        var self = this;
        $('#editResponsible').on('click', function () {
            self.editResponsible();
        });
        $('#addPadawan').on('click', function () {
            self.addPadawanResponsible();
        });
    },
    getResponsible : function () {
        var id = {
                id_responsible: this.id_responsible
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/getResponsible.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (responsible) {
                    CTS.Responsible.responsible = responsible[0];
                    $('#info').empty();
                    $('#info').append('<p>' + responsible[0].lastname + ' ' + responsible[0].name + '</p>'
                        +'<p>DNI: ' + responsible[0].dni +'</p>'
                        +'<p>Address: ' + responsible[0].address +'</p>'
                        +'<p>Phone: ' + responsible[0].phone +'</p>'
                        +'<p>Mobile: ' + responsible[0].mobile +'</p>'
                        +'<p>Email: ' + responsible[0].email +'</p>'
                        +'<p>Facebook: ' + responsible[0].facebook +'</p>'
                        +'<p>Twitter: ' + responsible[0].twitter +'</p>');
                    if (responsible[0].padawans.length>0){
                        var padawans = '<p>Padawans:</p><div class="panel list-group">';
                        for (var i=0;i<responsible[0].padawans.length;i++) {
                            padawans=padawans+'<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + responsible[0].padawans[i].id +'" data-parent="#menu">' + responsible[0].padawans[i].lastname + ' ' + responsible[0].padawans[i].name + '</a>'
                            +'<div id="' + responsible[0].padawans[i].id +'" class="sublinks collapse">'
                            +'<a class="list-group-item" href="padawan.html?id_padawan=' + responsible[0].padawans[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                            +'<a class="list-group-item" onclick="CTS.Responsible.removePadawan(\'' + responsible[0].padawans[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Padawan</a>'
                            +'</div>';
                        }
                        $('#info').append(padawans +'</div>');
                    }
                    $('#info').append('<p>Status: ' + responsible[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editResponsible : function () {
        this.setModalResponsible('Edit Responsible');
        CTS.Utils.showModal('modalEditResponsible');
        this.setResponsible();
    },
    setModalResponsible : function (title) {
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
            +'              <input id="lastname" type="text" class="form-control" placeholder="lastname"><br>'
            +'              <input id="dni" type="number" class="form-control" placeholder="dni"><br>'
            +'              <input id="phone" type="text" class="form-control" placeholder="phone"><br>'
            +'              <input id="mobile" type="text" class="form-control" placeholder="mobile"><br>'
            +'              <input id="email" type="text" class="form-control" placeholder="email"><br>'
            +'              <input id="facebook" type="text" class="form-control" placeholder="facebook"><br>'
            +'              <input id="twitter" type="text" class="form-control" placeholder="twitter"><br>'
            +'              <input id="address" type="text" class="form-control" placeholder="address"><br>'
            +'              <label>status:</label>'
            +'                   <select name="status" id="status">'
            +'                  </select>'
            +'          </div>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Responsible.saveResponsible();">Save changes</button>'
            +'      </div>');
    },
    setResponsible : function () {
        $("#name").val(this.responsible.name);
        $("#lastname").val(this.responsible.lastname);
        $("#dni").val(this.responsible.dni);
        $("#phone").val(this.responsible.phone);
        $("#mobile").val(this.responsible.mobile);
        $("#email").val(this.responsible.email);
        $("#facebook").val(this.responsible.facebook);
        $("#twitter").val(this.responsible.twitter);
        $("#address").val(this.responsible.address);
        CTS.Utils.setStatus(this.responsible.id_status,'status');
    },
    saveResponsible : function () {
        var responsible = {
                id_responsible: this.id_responsible,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: $("#dni").val(),
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
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Responsable fue editado correctamente");
                CTS.Utils.closeModal('modalEditResponsible');
                CTS.Responsible.getResponsible();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawanResponsible : function () {
        this.setModalAddPadawan('Add Padawan');
        CTS.Utils.showModal('modalAddPadawan');
        this.setPadawans();
    },
    setModalAddPadawan : function (title){
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <label>Padawans:</label>'
            +'                   <select class="padawans-multiple" multiple="multiple" style="width: 80%" name="padawans" id="padawans">'
            +'                  </select>'
            +'          </div>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Responsible.addPadawan();">Add Padawan</button>'
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
                $(".padawans-multiple").select2();
            },
            error: function() {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function () {
        var ids = {
                id_responsible: this.id_responsible,
                padawans: $("#padawans").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Utils.closeModal('modalAddPadawan');
                CTS.Responsible.getResponsible();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removePadawan : function (id_padawan) {
        var ids = {
                id_responsible: this.id_responsible,
                id_padawan: id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/removePadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue removido correctamente.");
                CTS.Responsible.getResponsible();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Responsible.init();
});