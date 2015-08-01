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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
            +'              <input id="lastname" type="text" class="form-control" placeholder="lastname"><br>'
            +'              <input id="dni" type="text" class="form-control" placeholder="dni"><br>'
            +'              <input id="birthdate" type="text" class="form-control" placeholder="birthdate"><br>'
            +'              <input id="phone" type="text" class="form-control" placeholder="phone"><br>'
            +'              <input id="mobile" type="text" class="form-control" placeholder="mobile"><br>'
            +'              <input id="email" type="text" class="form-control" placeholder="email"><br>'
            +'              <input id="facebook" type="text" class="form-control" placeholder="facebook"><br>'
            +'              <input id="twitter" type="text" class="form-control" placeholder="twitter"><br>'
            +'              <input id="school" type="text" class="form-control" placeholder="school"><br>'
            +'              <input id="address" type="text" class="form-control" placeholder="address"><br>'
            +'              <label>status:</label>'
            +'                   <select name="status" id="status">'
            +'                  </select>'
            +'          </div>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');

    },
    setPadawan : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: 'id='+ id,
            cache: false,
            success: function (atr) {
                document.getElementById("name").value = atr[0].name;
                document.getElementById("lastname").value = atr[0].lastname;
                document.getElementById("dni").value = atr[0].dni;
                document.getElementById("birthdate").value = atr[0].birthdate;
                document.getElementById("phone").value = atr[0].phone;
                document.getElementById("mobile").value = atr[0].mobile;
                document.getElementById("email").value = atr[0].email;
                document.getElementById("facebook").value = atr[0].facebook;
                document.getElementById("twitter").value = atr[0].twitter;
                document.getElementById("school").value = atr[0].school;
                document.getElementById("address").value = atr[0].address;
                CTS.Utils.setStatus(atr[0].id_status,'status')
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    savePadawan : function (id) {
        var padawan = {
                id: id,
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
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/updatePadawan.php",
            data: JSON.stringify(padawan),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue editado correctamente");
                CTS.Padawans.closeModalEditPadawan();
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
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/newPadawan.php",
            data: JSON.stringify(padawan),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue creado correctamente.");
                CTS.Padawans.closeModalEditPadawan();
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
