var CTS = CTS || {};

CTS.Padawan = {
    id_padawan : '',
    padawan : {},
    init : function () {
        this.id_padawan = CTS.Utils.getURLParameter('id_padawan');
        this.bindActions();
        this.getPadawan();
    },
    bindActions : function () {
        var self = this;
        $('#editPadawan').on('click', function () {
            self.editPadawan();
        });
    },
    getPadawan : function () {
        var id = {
                id_padawan: this.id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: JSON.stringify(id),
            cache: false,
            success: function(padawan) {
                    CTS.Padawan.padawan = padawan[0];
                    $('#info').empty();

                    var dojos = '';
                    for (var i=0;i<padawan[0].dojos.length;i++) {
                        if ((i+1)==padawan[0].dojos.length)
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + padawan[0].dojos[i].name + '&id_dojo=' + padawan[0].dojos[i].id + '">' + padawan[0].dojos[i].name + '</a>';
                        else
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + padawan[0].dojos[i].name + '&id_dojo=' + padawan[0].dojos[i].id + '">' + padawan[0].dojos[i].name + '</a>, ';
                    }
                    var responsibles = '';
                    for (var i=0;i<padawan[0].responsibles.length;i++) {
                        if ((i+1)==padawan[0].responsibles.length)
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + padawan[0].responsibles[i].id + '">' + padawan[0].responsibles[i].lastname + ' ' + padawan[0].responsibles[i].name + '</a>';
                        else
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + padawan[0].responsibles[i].id + '">' + padawan[0].responsibles[i].lastname + ' ' + padawan[0].responsibles[i].name + '</a>, ';
                    }
                    var projects = '';
                    for (var i=0;i<padawan[0].projects.length;i++) {
                        if ((i+1)==padawan[0].projects.length)
                            projects = projects + '<a href="project.html?id_project=' + padawan[0].projects[i].id + '">' + padawan[0].projects[i].name + '</a>';
                        else
                            projects = projects + '<a href="project.html?id_project=' + padawan[0].projects[i].id + '">' + padawan[0].projects[i].name + '</a>, ';
                    }
                    $('#info').append('<p>' + padawan[0].lastname + ' ' + padawan[0].name + '</p>'
                        +'<p>DNI: ' + padawan[0].dni +'</p>'
                        +'<p>Birthdate: ' + padawan[0].birthdate +'</p>'
                        +'<p>Address: ' + padawan[0].address +'</p>'
                        +'<p>Phone: ' + padawan[0].phone +'</p>'
                        +'<p>Mobile: ' + padawan[0].mobile +'</p>'
                        +'<p>Email: ' + padawan[0].email +'</p>'
                        +'<p>Facebook: ' + padawan[0].facebook +'</p>'
                        +'<p>Twitter: ' + padawan[0].twitter +'</p>'
                        +'<p>School: ' + padawan[0].school +'</p>'
                        +'<p>Admission Date: ' + padawan[0].admission_date +'</p>'
                        +'<p>Dojos: ' + dojos +'</p>'
                        +'<p>Responsibles: ' + responsibles +'</p>'
                        +'<p>Projects: ' + projects +'</p>'
                        +'<p>Status: ' + padawan[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editPadawan : function () {
        this.setModalPadawan('Edit Padawan');
        CTS.Utils.showModal('modalEditPadawan');
        this.setPadawan();
    },
    setModalPadawan : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditPadawan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
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
            +'              <div class="form-group"><label for="birthdate" class="col-sm-2 control-label">Birthdate</label><div class="col-sm-10"><input id="birthdate" type="date" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="phone" class="col-sm-2 control-label">Phone</label><div class="col-sm-10"><input id="phone" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="mobile" class="col-sm-2 control-label">Mobile</label><div class="col-sm-10"><input id="mobile" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="email" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input id="email" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="facebook" class="col-sm-2 control-label">Facebook</label><div class="col-sm-10"><input id="facebook" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="twitter" class="col-sm-2 control-label">Twitter</label><div class="col-sm-10"><input id="twitter" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="school" class="col-sm-2 control-label">School</label><div class="col-sm-10"><input id="school" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="address" class="col-sm-2 control-label">Address</label><div class="col-sm-10"><input id="address" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="admission_date" class="col-sm-2 control-label">Admission</label><div class="col-sm-10"><input id="admission_date" type="date" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="status" class="col-sm-2 control-label">Status</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="status" id="status"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Padawan.savePadawan();">Save changes</button>'
            +'      </div>');
    },
    setPadawan : function () {
        $("#name").val(this.padawan.name);
        $("#lastname").val(this.padawan.lastname);
        $("#dni").val(this.padawan.dni);
        $("#birthdate").val(this.padawan.birthdate);
        $("#phone").val(this.padawan.phone);
        $("#mobile").val(this.padawan.mobile);
        $("#email").val(this.padawan.email);
        $("#facebook").val(this.padawan.facebook);
        $("#twitter").val(this.padawan.twitter);
        $("#school").val(this.padawan.school);
        $("#address").val(this.padawan.address);
        $("#admission_date").val(this.padawan.admission_date);
        CTS.Utils.setStatus(this.padawan.id_status,'status');
    },
    savePadawan : function () {
        var padawan = {
                id_padawan: this.id_padawan,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: $("#dni").val(),
                birthdate: $("#birthdate").val(),
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                school: $("#school").val(),
                address: $("#address").val(),
                admission_date: $("#admission_date").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/updatePadawan.php",
            data: JSON.stringify(padawan),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue editado correctamente");
                CTS.Utils.closeModal('modalEditPadawan')
                CTS.Padawan.getPadawan();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Padawan.init();
});