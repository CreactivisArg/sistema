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
        $('#addSkill').on('click', function () {
            self.addSkillMentor();
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
                        +'<p>Birthdate: ' + mentor[0].birthdate +'</p>'
                        +'<p>Country: ' + mentor[0].country +'</p>'
                        +'<p>State: ' + mentor[0].state +'</p>'
                        +'<p>City: ' + mentor[0].city +'</p>'
                        +'<p>Address: ' + mentor[0].address +'</p>'
                        +'<p>Phone: ' + mentor[0].phone +'</p>'
                        +'<p>Mobile: ' + mentor[0].mobile +'</p>'
                        +'<p>Email: ' + mentor[0].email +'</p>'
                        +'<p>Facebook: ' + mentor[0].facebook +'</p>'
                        +'<p>Twitter: ' + mentor[0].twitter +'</p>'
                        +'<p>Admission Date: ' + mentor[0].admission_date +'</p>'
                        +'<p>Dojos: ' + dojos +'</p>');
                    if (mentor[0].skills.length>0){
                        var skills = '<p>Skills:</p><div class="panel list-group">';
                        for (var i=0;i<mentor[0].skills.length;i++) {
                            skills=skills+'<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + mentor[0].skills[i].id +'" data-parent="#menu">' + mentor[0].skills[i].name + '</a>'
                            +'<div id="' + mentor[0].skills[i].id +'" class="sublinks collapse">'
                            +'<a class="list-group-item" onclick="CTS.Mentor.removeSkill(\'' + mentor[0].skills[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Skill</a>'
                            +'</div>';
                        }
                        $('#info').append(skills +'</div>');
                    }
                    $('#info').append('<p>Status: ' + mentor[0].status +'</p>');
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Mentor.saveMentor();">Save changes</button>'
            +'      </div>');
    },
    setMentor : function () {
        $("#name").val(this.mentor.name);
        $("#lastname").val(this.mentor.lastname);
        $("#dni").val(this.mentor.dni);
        $("#birthdate").val(this.mentor.birthdate);
        $("#phone").val(this.mentor.phone);
        $("#mobile").val(this.mentor.mobile);
        $("#email").val(this.mentor.email);
        $("#facebook").val(this.mentor.facebook);
        $("#twitter").val(this.mentor.twitter);
        $("#country").val(this.mentor.country);
        $("#state").val(this.mentor.state);
        $("#city").val(this.mentor.city);
        $("#address").val(this.mentor.address);
        $("#admission_date").val(this.mentor.admission_date);
        CTS.Utils.setStatus(this.mentor.id_status,'status');
    },
    saveMentor : function () {
        var mentor = {
                id_mentor: this.id_mentor,
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
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue editado correctamente");
                CTS.Utils.closeModal('modalEditMentor');
                CTS.Mentor.getMentor();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addSkillMentor : function () {
        this.setModalAddSkill('Add Skill');
        CTS.Utils.showModal('modalAddSkill');
        CTS.Utils.getSkills(null,'skills');
    },
    setModalAddSkill : function (title){
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddSkill" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="skills" class="col-sm-2 control-label">Skills</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="skills" id="skills"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Mentor.addSkill();">Add Skill</button>'
            +'      </div>');
    },
    addSkill : function () {
        var ids = {
                id_mentor: this.id_mentor,
                skills: $("#skills").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/addSkill.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La habilidad fue agregada correctamente");
                CTS.Utils.closeModal('modalAddSkill');
                CTS.Mentor.getMentor();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removeSkill : function (id_skill) {
        var ids = {
                id_mentor: this.id_mentor,
                id_skill: id_skill
            };
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/removeSkill.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La habilidad fue removida correctamente.");
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