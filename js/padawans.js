var CTS = CTS || {};

CTS.Padawans = {
    init : function () {
        this.bindActions();
        this.getPadawans();
    },
    bindActions : function () {
        var self = this;
        // setNewPadawan
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewPadawan();
        });
    },
    getPadawans : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/padawan/getPadawan.php",
            cache: false,
            success: function (list) {
                $('#listPanel').empty();

                for (var i=0;i<list.length;i++) {
                    var dojos = '';
                    for (var j=0;j<list[i].dojos.length;j++) {
                        if ((j+1)==list[i].dojos.length)
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + list[i].dojos[j].name + '&id_dojo=' + list[i].dojos[j].id + '">' + list[i].dojos[j].name + '</a>';
                        else
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + list[i].dojos[j].name + '&id_dojo=' + list[i].dojos[j].id + '">' + list[i].dojos[j].name + '</a>, ';
                    }
                    var responsibles = '';
                    for (var j=0;j<list[i].responsibles.length;j++) {
                        if ((j+1)==list[i].responsibles.length)
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + list[i].responsibles[j].id + '">' + list[i].responsibles[j].lastname + ' ' + list[i].responsibles[j].name + '</a>';
                        else
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + list[i].responsibles[j].id + '">' + list[i].responsibles[j].lastname + ' ' + list[i].responsibles[j].name + '</a>, ';
                    }
                    var projects = '';
                    for (var j=0;j<list[i].projects.length;j++) {
                        if ((j+1)==list[i].projects.length)
                            projects = projects + '<a href="project.html?id_project=' + list[i].projects[j].id + '">' + list[i].projects[j].name + '</a>';
                        else
                            projects = projects + '<a href="project.html?id_project=' + list[i].projects[j].id + '">' + list[i].projects[j].name + '</a>, ';
                    }
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + list[i].dni +'</div>'
                        +'<div class="list-group-item small">Birthdate: ' + list[i].birthdate +'</div>'
                        +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + list[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                        +'<div class="list-group-item small">School: ' + list[i].school +'</div>'
                        +'<div class="list-group-item small">Admission Date: ' + list[i].admission_date +'</div>'
                        +'<div class="list-group-item small">Dojos: ' + dojos +'</div>'
                        +'<div class="list-group-item small">Responsibles: ' + responsibles +'</div>'
                        +'<div class="list-group-item small">Projects: ' + projects +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" href="padawan.html?id_padawan=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Padawans.editPadawan(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editPadawan : function (id) {
        this.setModalPadawan('Edit Padawan', id);
        CTS.Utils.showModal('modalEditPadawan');
        this.setPadawan(id);
    },
    setModalPadawan : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Padawans.savePadawan(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Padawans.newPadawan();">Save changes</button>';

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
            +           saveBtn
            +'      </div>');
    },
    setPadawan : function (id) {
        var id = {
                id_padawan: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (atr) {
                $("#name").val(atr[0].name);
                $("#lastname").val(atr[0].lastname);
                $("#dni").val(atr[0].dni);
                $("#birthdate").val(atr[0].birthdate);
                $("#phone").val(atr[0].phone);
                $("#mobile").val(atr[0].mobile);
                $("#email").val(atr[0].email);
                $("#facebook").val(atr[0].facebook);
                $("#twitter").val(atr[0].twitter);
                $("#school").val(atr[0].school);
                $("#address").val(atr[0].address);
                $("#admission_date").val(atr[0].admission_date);
                CTS.Utils.setStatus(atr[0].id_status,'status');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    savePadawan : function (id) {
        var padawan = {
                id_padawan: id,
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
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue editado correctamente");
                CTS.Utils.closeModal('modalEditPadawan')
                CTS.Padawans.getPadawans();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewPadawan : function () {
        this.setModalPadawan('New Padawan', null);
        CTS.Utils.showModal('modalEditPadawan');
        CTS.Utils.setStatus(null,'status');
    },
    newPadawan : function () {
        var padawan = {
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
            url: "api/padawan/newPadawan.php",
            data: JSON.stringify(padawan),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue creado correctamente.");
                CTS.Utils.closeModal('modalEditPadawan');
                CTS.Padawans.getPadawans();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Padawans.init();
});