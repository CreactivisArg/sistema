var CTS = CTS || {};

CTS.Padawan = {
    id_padawan : '',
    padawan : {},
    init : function () {
        this.id_padawan = CTS.Utils.getURLParameter('id_padawan');
        this.bindActions();
        this.getPadawan();
        this.getLogs();
        this.getDiaries();
        this.getPayments();
    },
    bindActions : function () {
        var self = this;
        $('#editPadawan').on('click', function () {
            self.editPadawan();
        });
        $('#addSkill').on('click', function () {
            self.addSkillPadawan();
        });
        $('#addPhoto').on('click', function () {
            self.addPhoto();
        });
        $('#showInfo').on('click', function () {
            self.showInfo();
        });
        $('#showLogs').on('click', function () {
            self.showLogs();
        });
        $('#showDiaries').on('click', function () {
            self.showDiaries();
        });
        $('#showPayments').on('click', function () {
            self.showPayments();
        });
    },
    showInfo : function () {
        $('#info').show();
        $('#listLogs').hide();
        $('#listDiaries').hide();
        $('#listPayments').hide();
        $('#tabInfo').addClass('active');
        $('#tabLogs').removeClass('active');
        $('#tabDiaries').removeClass('active');
        $('#tabPayments').removeClass('active');
    },
    showLogs : function () {
        $('#info').hide();
        $('#listLogs').show();
        $('#listDiaries').hide();
        $('#listPayments').hide();
        $('#tabInfo').removeClass('active');
        $('#tabLogs').addClass('active');
        $('#tabDiaries').removeClass('active');
        $('#tabPayments').removeClass('active');
    },
    showDiaries : function () {
        $('#info').hide();
        $('#listLogs').hide();
        $('#listDiaries').show();
        $('#listPayments').hide();
        $('#tabInfo').removeClass('active');
        $('#tabLogs').removeClass('active');
        $('#tabDiaries').addClass('active');
        $('#tabPayments').removeClass('active');
    },
    showPayments : function () {
        $('#info').hide();
        $('#listLogs').hide();
        $('#listDiaries').hide();
        $('#listPayments').show();
        $('#tabInfo').removeClass('active');
        $('#tabLogs').removeClass('active');
        $('#tabDiaries').removeClass('active');
        $('#tabPayments').addClass('active');
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
                    var picture = '';
                    if (padawan[0].path_picture) {
                        picture = '<img src="'+padawan[0].path_picture+'" height="200" width="200" class="circular-image"><br><br>'
                    }
                    $('#info').append('<br>'+picture+'<p>' + padawan[0].lastname + ' ' + padawan[0].name + '</p>'
                        +'<p>DNI: ' + padawan[0].dni +'</p>'
                        +'<p>Birthdate: ' + padawan[0].birthdate + ' (' + CTS.Utils.calculateAge(padawan[0].birthdate) + ')</p>'
                        +'<p>Country: ' + padawan[0].country +'</p>'
                        +'<p>State: ' + padawan[0].state +'</p>'
                        +'<p>City: ' + padawan[0].city +'</p>'
                        +'<p>Address: ' + padawan[0].address +'</p>'
                        +'<p>Phone: ' + padawan[0].phone +'</p>'
                        +'<p>Mobile: ' + padawan[0].mobile +'</p>'
                        +'<p>Email: ' + padawan[0].email +'</p>'
                        +'<p>Facebook: ' + padawan[0].facebook +'</p>'
                        +'<p>Twitter: ' + padawan[0].twitter +'</p>'
                        +'<p>School: ' + padawan[0].school +'</p>'
                        +'<p>Scholarship: ' + padawan[0].scholarship +'</p>'
                        +'<p>Admission Date: ' + padawan[0].admission_date +'</p>'
                        +'<p>Dojos: ' + dojos +'</p>'
                        +'<p>Responsibles: ' + responsibles +'</p>'
                        +'<p>Projects: ' + projects +'</p>');
                    if (padawan[0].skills.length>0){
                        var skills = '<p>Skills:</p><div class="panel list-group">';
                        for (var i=0;i<padawan[0].skills.length;i++) {
                            skills=skills+'<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + padawan[0].skills[i].id +'" data-parent="#menu">' + padawan[0].skills[i].name + '</a>'
                            +'<div id="' + padawan[0].skills[i].id +'" class="sublinks collapse">'
                            +'<a class="list-group-item" onclick="CTS.Padawan.removeSkill(\'' + padawan[0].skills[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Skill</a>'
                            +'</div>';
                        }
                        $('#info').append(skills +'</div>');
                    }
                    $('#info').append('<p>Status: ' + padawan[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getLogs : function () {
        var id = {
                id_padawan: this.id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/log/getLog.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (logs) {
                $('#listLogs').empty();
                for (var i=0;i<logs.length;i++) {
                    $('#listLogs').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + logs[i].id +'" data-parent="#menu">' + logs[i].date + '</a>'
                        +'<div id="' + logs[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Dojo: ' + logs[i].dojo_name +'</div>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getDiaries : function () {
        var id = {
                id_padawan: this.id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/getDiary.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listDiaries').empty();
                for (var i=0;i<list.length;i++) {
                    $('#listDiaries').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].date + ' - ' + list[i].project_name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Project: <a href="project.html?id_project=' + list[i].id_project + '">' + list[i].project_name + '</a></div>'
                        +'<div class="list-group-item small">Date: ' + list[i].date +'</div>'
                        +'<div class="list-group-item small">Last Week: ' + list[i].last_week +'</div>'
                        +'<div class="list-group-item small">Daily Target: ' + list[i].daily_target +'</div>'
                        +'<div class="list-group-item small">Tools: ' + list[i].tools +'</div>'
                        +'<div class="list-group-item small">Observations: ' + list[i].observations +'</div>'
                        +'<div class="list-group-item small">Attitude: ' + list[i].attitude +'</div>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getPayments : function () {
        var id = {
                id_padawan: this.id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/getPayment.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listPayments').empty();
                for (var i=0;i<list.length;i++) {
                    $('#listPayments').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">'  + list[i].month + '/' +  list[i].year + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Date: ' + list[i].date +'</div>'
                        +'<div class="list-group-item small">Amount: ' + list[i].amount +'</div>'
                        +'<div class="list-group-item small">Method: ' + list[i].method +'</div>'
                        +'<div class="list-group-item small">Observation: ' + list[i].observation +'</div>'
                        +'</div>');
                }
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
            +'              <div class="form-group"><label for="scholarship" class="col-sm-2 control-label">Scholarship</label><div class="col-sm-10"><input id="scholarship" type="number" min="0" max="100" step="any" class="form-control"></div></div>'
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
        $("#scholarship").val(this.padawan.scholarship);
        $("#country").val(this.padawan.country);
        $("#state").val(this.padawan.state);
        $("#city").val(this.padawan.city);
        $("#address").val(this.padawan.address);
        $("#admission_date").val(this.padawan.admission_date);
        CTS.Utils.setStatus(this.padawan.id_status,'status');
    },
    savePadawan : function () {
        var padawan = {
                id_padawan: this.id_padawan,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                birthdate: $("#birthdate").val(),
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                school: $("#school").val(),
                scholarship: $("#scholarship").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
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
    },
    addSkillPadawan : function () {
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
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Padawan.addSkill();">Add Skill</button>'
            +'      </div>');
    },
    addSkill : function () {
        var ids = {
                id_padawan: this.id_padawan,
                skills: $("#skills").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/addSkill.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La habilidad fue agregada correctamente");
                CTS.Utils.closeModal('modalAddSkill');
                CTS.Padawan.getPadawan();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removeSkill : function (id_skill) {
        var ids = {
                id_padawan: this.id_padawan,
                id_skill: id_skill
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/removeSkill.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La habilidad fue removida correctamente.");
                CTS.Padawan.getPadawan();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPhoto : function () {
        this.setModalAddPhoto('Add Photo');
        CTS.Utils.showModal('modalAddPhoto');
    },
    setModalAddPhoto : function (title){
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddPhoto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="photo" class="col-sm-2 control-label">Photo</label><div class="col-sm-10"><input type="file" name="photo" id="photo"/></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Padawan.savePhoto();">Add Photo</button>'
            +'      </div>');
    },
    savePhoto : function () {
        var photo = $('#photo')[0].files[0];
        if (photo.size>1048576){
            CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","La foto debe pesar menos de 1 MB.");
        } else {
            var data = new FormData();
            data.append('photo', photo);
            data.append("id_contact", this.padawan.id_contact);
            jQuery.ajax({
                type: "POST",
                url: "api/photoUpload.php",
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function () {
                    CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La foto fue agregada correctamente");
                    CTS.Utils.closeModal('modalAddPhoto');
                    CTS.Padawan.getPadawan();
                },
                error: function () {
                    CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
                }
            });
        }   
    }
};

$(function () {
    CTS.Padawan.init();
});