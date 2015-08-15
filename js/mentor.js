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
        var id = {
                id_mentor: this.id_mentor
            };
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/getMentor.php",
            data: JSON.stringify(id),
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
        CTS.Utils.showModal('modalEditMentor');
        this.setMentor();
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Mentor.saveMentor();">Save changes</button>'
            +'      </div>');
    },
    setMentor : function () {
        $("#name").val(this.mentor.name);
        $("#lastname").val(this.mentor.lastname);
        $("#dni").val(this.mentor.dni);
        $("#phone").val(this.mentor.phone);
        $("#mobile").val(this.mentor.mobile);
        $("#email").val(this.mentor.email);
        $("#facebook").val(this.mentor.facebook);
        $("#twitter").val(this.mentor.twitter);
        $("#address").val(this.mentor.address);
        CTS.Utils.setStatus(this.mentor.id_status,'status');
    },
    saveMentor : function () {
        var mentor = {
                id_mentor: this.id_mentor,
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
            url: "api/mentor/updateMentor.php",
            data: JSON.stringify(mentor),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue editado correctamente");
                CTS.Utils.closeModal('modalEditMentor');
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