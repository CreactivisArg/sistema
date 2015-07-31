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
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: 'id='+ this.id_padawan,
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
        this.showModalEditPadawan();
        this.setPadawan();
    },
    closeModalEditPadawan : function () {
        $('#modalEditPadawan').modal('hide');
    },
    showModalEditPadawan : function () {
        $('#modalEditPadawan').modal('show');
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Padawan.savePadawan();">Save changes</button>'
            +'      </div>');
        
    },
    setPadawan : function () {
        document.getElementById("name").value = this.padawan.name; 
        document.getElementById("lastname").value = this.padawan.lastname;
        document.getElementById("dni").value = this.padawan.dni;
        document.getElementById("birthdate").value = this.padawan.birthdate;
        document.getElementById("phone").value = this.padawan.phone;
        document.getElementById("mobile").value = this.padawan.mobile;
        document.getElementById("email").value = this.padawan.email;
        document.getElementById("facebook").value = this.padawan.facebook;
        document.getElementById("twitter").value = this.padawan.twitter;
        document.getElementById("school").value = this.padawan.school;
        document.getElementById("address").value = this.padawan.address;
        CTS.Utils.setStatus(this.padawan.id_status,'status');
    },
    savePadawan : function () {
        var padawan = {
                id: this.id_padawan,
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
            success: function () {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue editado correctamente");
                CTS.Padawan.closeModalEditPadawan();
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