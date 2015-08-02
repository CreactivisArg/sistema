var CTS = CTS || {};

CTS.Mentors = {
    init : function () {
        this.bindActions();
        this.getMentors();
    },
    bindActions : function () {
        var self = this;
        // setNewMentor
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewMentor();
        });
    },
    getMentors : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/mentor/getMentor.php",
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
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + list[i].dni +'</div>'
                        +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + list[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                        +'<div class="list-group-item small">Dojos: ' + dojos +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" href="mentor.html?id_mentor=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Mentors.editMentor(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editMentor : function (id) {
        this.setModalMentor('Edit Mentor', id);
        CTS.Utils.showModal('modalEditMentor');
        this.setMentor(id);
    },
    setModalMentor : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Mentors.saveMentor(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Mentors.newMentor();">Save changes</button>';

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
            +           saveBtn
            +'      </div>');
    },
    setMentor : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/getMentor.php",
            data: 'id='+ id,
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
    saveMentor : function (id) {
        var mentor = {
                id: id,
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
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue editado correctamente");
                CTS.Utils.closeModal('modalEditMentor')
                CTS.Mentors.getMentors();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewMentor : function () {
        this.setModalMentor('New Mentor', null);
        CTS.Utils.showModal('modalEditMentor');
        CTS.Utils.setStatus(null,'status');
    },
    newMentor : function () {
        var mentor = {
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
            url: "api/mentor/newMentor.php",
            data: JSON.stringify(mentor),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue creado correctamente.");
                CTS.Utils.closeModal('modalEditMentor');
                CTS.Mentors.getMentors();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Mentors.init();
});