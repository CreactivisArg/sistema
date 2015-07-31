var CTS = CTS || {};

CTS.Mentor = {
    id_mentor : '',
    mentor : {},
    init : function () {
        this.id_mentor = CTS.Utils.getURLParameter('id_mentor');
        this.bindActions();
        this.getMentor();
    },
    bindActions : function () {
        var self = this;
        $('#editMentor').on('click', function () {
            self.editMentor();
        }); 
    },
    getMentor : function () {
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/getMentor.php",
            data: 'id='+ this.id_mentor,
            cache: false,
            success: function(mentor) {
                    CTS.Mentor.mentor = mentor[0];  
                    $('#info').empty();
                    
                    var dojos = '';
                    for (var i=0;i<mentor[0].dojos.length;i++) {
                        if ((i+1)==mentor[0].dojos.length)
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + mentor[0].dojos[i].name + '&id_dojo=' + mentor[0].dojos[i].id + '">' + mentor[0].dojos[i].name + '</a>';
                        else
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + mentor[0].dojos[i].name + '&id_dojo=' + mentor[0].dojos[i].id + '">' + mentor[0].dojos[i].name + '</a>, ';
                    }
                    $('#info').append('<p>' + mentor[0].lastname + ' ' + mentor[0].name + '</p>'
                        +'<p>DNI: ' + mentor[0].dni +'</p>'
                        +'<p>Address: ' + mentor[0].address +'</p>'
                        +'<p>Phone: ' + mentor[0].phone +'</p>'
                        +'<p>Mobile: ' + mentor[0].mobile +'</p>'
                        +'<p>Email: ' + mentor[0].email +'</p>'
                        +'<p>Facebook: ' + mentor[0].facebook +'</p>'
                        +'<p>Twitter: ' + mentor[0].twitter +'</p>'
                        +'<p>Dojos: ' + dojos +'</p>'
                        +'<p>Status: ' + mentor[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editMentor : function () {
        this.setModalMentor('Edit Mentor');
        this.showModalEditMentor();
        this.setMentor();
    },
    closeModalEditMentor : function () {
        $('#modalEditMentor').modal('hide');
    },
    showModalEditMentor : function () {
        $('#modalEditMentor').modal('show');
    },
    setModalMentor : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditMentor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Mentor.saveMentor();">Save changes</button>'
            +'      </div>');
        
    },
    setMentor : function () {
        document.getElementById("name").value = this.mentor.name; 
        document.getElementById("lastname").value = this.mentor.lastname;
        document.getElementById("dni").value = this.mentor.dni;
        document.getElementById("phone").value = this.mentor.phone;
        document.getElementById("mobile").value = this.mentor.mobile;
        document.getElementById("email").value = this.mentor.email;
        document.getElementById("facebook").value = this.mentor.facebook;
        document.getElementById("twitter").value = this.mentor.twitter;
        document.getElementById("address").value = this.mentor.address;
        CTS.Utils.setStatus(this.mentor.id_status,'status');
    },
    saveMentor : function () {
        var mentor = {
                id: this.id_mentor,
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
            url: "api/mentor/updateMentor.php",
            data: JSON.stringify(mentor),
            cache: false,
            success: function () {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue editado correctamente");
                CTS.Mentor.closeModalEditMentor();
                CTS.Mentor.getMentor();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Mentor.init();
});