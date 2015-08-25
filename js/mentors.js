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
                    var skills = '';
                    for (var j=0;j<list[i].skills.length;j++) {
                        if ((j+1)==list[i].skills.length)
                            skills = skills + '<a href="listSkill.html?name_skill=' + list[i].skills[j].name + '&id_skill=' + list[i].skills[j].id + '">' + list[i].skills[j].name + '</a>';
                        else
                            skills = skills + '<a href="listSkill.html?name_skill=' + list[i].skills[j].name + '&id_skill=' + list[i].skills[j].id + '">' + list[i].skills[j].name + '</a>, ';
                    }
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + list[i].dni +'</div>'
                        +'<div class="list-group-item small">Birthdate: ' + list[i].birthdate +'</div>'
                        +'<div class="list-group-item small">Country: ' + list[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + list[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + list[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + list[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                        +'<div class="list-group-item small">Admission Date: ' + list[i].admission_date +'</div>'
                        +'<div class="list-group-item small">Skills: ' + skills +'</div>'
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
            +'              <div class="form-group"><label for="country" class="col-sm-2 control-label">Country</label><div class="col-sm-10"><input id="country" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="state" class="col-sm-2 control-label">State</label><div class="col-sm-10"><input id="state" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="city" class="col-sm-2 control-label">City</label><div class="col-sm-10"><input id="city" type="text" class="form-control"></div></div>'
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
    setMentor : function (id) {
        var id = {
                id_mentor: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/getMentor.php",
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
                $("#country").val(atr[0].country);
                $("#state").val(atr[0].state);
                $("#city").val(atr[0].city);
                $("#address").val(atr[0].address);
                $("#admission_date").val(atr[0].admission_date);
                CTS.Utils.setStatus(atr[0].id_status,'status');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveMentor : function (id) {
        var mentor = {
                id_mentor: id,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                birthdate: $("#birthdate").val(),
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
                address: $("#address").val(),
                admission_date: $("#admission_date").val(),
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
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                birthdate: $("#birthdate").val(),
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
                address: $("#address").val(),
                admission_date: $("#admission_date").val(),
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