var CTS = CTS || {};

CTS.Dojo = {
    id_dojo : '',
    name_dojo : '',
    dojo : {},
    init : function () {
        this.name_dojo = CTS.Utils.getURLParameter('name_dojo');
        $('#infoDojo').append('<p>'+this.name_dojo+'</p>');
        this.id_dojo = CTS.Utils.getURLParameter('id_dojo');
        this.bindActions();
        this.getDojo();
        this.getMembers();
        this.getProjects();
    },
    bindActions : function () {
        var self = this;
        $('#payment').attr("href", "listPayment.html?name_dojo=" + self.name_dojo + "&id_dojo="+self.id_dojo);
        $('#log').attr("href", "listLog.html?name_dojo=" + self.name_dojo + "&id_dojo="+self.id_dojo);
        $('#diary').attr("href", "listDiary.html?name_dojo=" + self.name_dojo + "&id_dojo="+self.id_dojo);
        $('#addPhoto').on('click', function () {
            self.addPhoto();
        });
        $('#addPadawan').on('click', function () {
            self.addPadawanDojo();
        });
        $('#addMentor').on('click', function () {
            self.addMentorDojo();
        });
        $('#addEmployee').on('click', function () {
            self.addEmployeeDojo();
        });
        $('#showPadawans').on('click', function () {
            self.showPadawans();
        });
        $('#showMentors').on('click', function () {
            self.showMentors();
        });
        $('#showResponsibles').on('click', function () {
            self.showResponsibles();
        });
        $('#showEmployees').on('click', function () {
            self.showEmployees();
        });
        $('#showProjects').on('click', function () {
            self.showProjects();
        });
    },
    showPadawans : function () {
        $('#listPanelPadawans').show();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').hide();
        $('#listPanelProjects').hide();
        $('#tabPadawans').addClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').removeClass('active');
        $('#tabProjects').removeClass('active');
    },
    showMentors : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').show();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').hide();
        $('#listPanelProjects').hide();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').addClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').removeClass('active');
        $('#tabProjects').removeClass('active');
    },
    showResponsibles : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').show();
        $('#listPanelEmployees').hide();
        $('#listPanelProjects').hide();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').addClass('active');
        $('#tabEmployees').removeClass('active');
        $('#tabProjects').removeClass('active');
    },
    showEmployees : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').show();
        $('#listPanelProjects').hide();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').addClass('active');
        $('#tabProjects').removeClass('active');
    },
    showProjects : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').hide();
        $('#listPanelProjects').show();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').removeClass('active');
        $('#tabProjects').addClass('active');
    },
    getDojo : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/getDojo.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (dojo) {
                CTS.Dojo.dojo=dojo[0];
                $('#infoDojo').empty();
                var picture = '';
                if (dojo[0].path_picture) {
                    picture = '<img src="'+dojo[0].path_picture+'" height="100" width="100" style="float:left;">'
                }
                $('#infoDojo').append(picture+'<p style="float:rigth;">'+dojo[0].name+'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getMembers : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/getMembers.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (dojo) {
                $('#listPanelPadawans').empty();
                var ages = [];
                for (var i=0;i<dojo[0].padawans.length;i++) {
                    var responsibles = '';
                    for (var j=0;j<dojo[0].padawans[i].responsibles.length;j++) {
                        if ((j+1)==dojo[0].padawans[i].responsibles.length)
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + dojo[0].padawans[i].responsibles[j].id + '">' + dojo[0].padawans[i].responsibles[j].lastname + ' ' + dojo[0].padawans[i].responsibles[j].name+ '</a>';
                        else
                            responsibles = responsibles + '<a href="responsible.html?id_responsible=' + dojo[0].padawans[i].responsibles[j].id + '">' + dojo[0].padawans[i].responsibles[j].lastname + ' ' + dojo[0].padawans[i].responsibles[j].name + '</a>, ';
                    }
                    var projects = '';
                    for (var j=0;j<dojo[0].padawans[i].projects.length;j++) {
                        if ((j+1)==dojo[0].padawans[i].projects.length)
                            projects = projects + '<a href="project.html?id_project=' + dojo[0].padawans[i].projects[j].id + '">' + dojo[0].padawans[i].projects[j].name + '</a>';
                        else
                            projects = projects + '<a href="project.html?id_project=' + dojo[0].padawans[i].projects[j].id + '">' + dojo[0].padawans[i].projects[j].name + '</a>, ';
                    }
                    var skills = '';
                    for (var j=0;j<dojo[0].padawans[i].skills.length;j++) {
                        if ((j+1)==dojo[0].padawans[i].skills.length)
                            skills = skills + '<a href="listSkill.html?name_skill=' + dojo[0].padawans[i].skills[j].name + '&id_skill=' + dojo[0].padawans[i].skills[j].id + '">' + dojo[0].padawans[i].skills[j].name + '</a>';
                        else
                            skills = skills + '<a href="listSkill.html?name_skill=' + dojo[0].padawans[i].skills[j].name + '&id_skill=' + dojo[0].padawans[i].skills[j].id + '">' + dojo[0].padawans[i].skills[j].name + '</a>, ';
                    }
                    var age = CTS.Utils.calculateAge(dojo[0].padawans[i].birthdate);
                    $('#listPanelPadawans').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].padawans[i].id +'" data-parent="#menu">' + dojo[0].padawans[i].lastname + ' ' + dojo[0].padawans[i].name + '</a>'
                        +'<div id="' + dojo[0].padawans[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].padawans[i].dni +'</div>'
                        +'<div class="list-group-item small">Birthdate: ' + dojo[0].padawans[i].birthdate + ' (' + age + ')</div>'
                        +'<div class="list-group-item small">Country: ' + dojo[0].padawans[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + dojo[0].padawans[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + dojo[0].padawans[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].padawans[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].padawans[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].padawans[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].padawans[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].padawans[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].padawans[i].twitter +'</div>'
                        +'<div class="list-group-item small">School: ' + dojo[0].padawans[i].school +'</div>'
                        +'<div class="list-group-item small">Scholarship: ' + dojo[0].padawans[i].scholarship +'</div>'
                        +'<div class="list-group-item small">Admission Date: ' + dojo[0].padawans[i].admission_date +'</div>'
                        +'<div class="list-group-item small">Responsibles: ' + responsibles +'</div>'
                        +'<div class="list-group-item small">Skills: ' + skills +'</div>'
                        +'<div class="list-group-item small">Projects: ' + projects +'</div>'
                        +'<div class="list-group-item small">Status: ' + dojo[0].padawans[i].status +'</div>'
                        +'<a class="list-group-item" href="padawan.html?id_padawan=' + dojo[0].padawans[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojo.removePadawan(\'' + dojo[0].padawans[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Padawan</a>'
                        +'</div>');
                    ages.push(age);
                }
                var average = ages.length ? CTS.Utils.getAvg(ages) : 0;
                $('#infoPadawans').text('Padawans: '+dojo[0].padawans.length + ' Average Age: ' + average);
                $('#listPanelMentors').empty();
                $('#infoMentors').text('Mentors: '+dojo[0].mentors.length);
                for (var i=0;i<dojo[0].mentors.length;i++) {
                    var skills = '';
                    for (var j=0;j<dojo[0].mentors[i].skills.length;j++) {
                        if ((j+1)==dojo[0].mentors[i].skills.length)
                            skills = skills + '<a href="listSkill.html?name_skill=' + dojo[0].mentors[i].skills[j].name + '&id_skill=' + dojo[0].mentors[i].skills[j].id + '">' + dojo[0].mentors[i].skills[j].name + '</a>';
                        else
                            skills = skills + '<a href="listSkill.html?name_skill=' + dojo[0].mentors[i].skills[j].name + '&id_skill=' + dojo[0].mentors[i].skills[j].id + '">' + dojo[0].mentors[i].skills[j].name + '</a>, ';
                    }
                    $('#listPanelMentors').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].mentors[i].id +'" data-parent="#menu">' + dojo[0].mentors[i].lastname + ' ' + dojo[0].mentors[i].name + '</a>'
                        +'<div id="' + dojo[0].mentors[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].mentors[i].dni +'</div>'
                        +'<div class="list-group-item small">Country: ' + dojo[0].mentors[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + dojo[0].mentors[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + dojo[0].mentors[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].mentors[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].mentors[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].mentors[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].mentors[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].mentors[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].mentors[i].twitter +'</div>'
                        +'<div class="list-group-item small">Admission Date: ' + dojo[0].mentors[i].admission_date +'</div>'
                        +'<div class="list-group-item small">Skills: ' + skills +'</div>'
                        +'<div class="list-group-item small">Status: ' + dojo[0].mentors[i].status +'</div>'
                        +'<a class="list-group-item" href="mentor.html?id_mentor=' + dojo[0].mentors[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojo.removeMentor(\'' + dojo[0].mentors[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Mentor</a>'
                        +'</div>');
                }
                $('#listPanelResponsibles').empty();
                for (var i=0;i<dojo[0].responsibles.length;i++) {
                    var padawans = '';
                    for (var j=0;j<dojo[0].responsibles[i].padawans.length;j++){
                        if ((j+1)==dojo[0].responsibles[i].padawans.length)
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + dojo[0].responsibles[i].padawans[j].id + '">' + dojo[0].responsibles[i].padawans[j].lastname + ' ' + dojo[0].responsibles[i].padawans[j].name + '</a>';
                        else
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + dojo[0].responsibles[i].padawans[j].id + '">' + dojo[0].responsibles[i].padawans[j].lastname + ' ' + dojo[0].responsibles[i].padawans[j].name + '</a>, ';
                    }
                    $('#listPanelResponsibles').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].responsibles[i].id +'" data-parent="#menu">' + dojo[0].responsibles[i].lastname + ' ' + dojo[0].responsibles[i].name + '</a>'
                        +'<div id="' + dojo[0].responsibles[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].responsibles[i].dni +'</div>'
                        +'<div class="list-group-item small">Country: ' + dojo[0].responsibles[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + dojo[0].responsibles[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + dojo[0].responsibles[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].responsibles[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].responsibles[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].responsibles[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].responsibles[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].responsibles[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].responsibles[i].twitter +'</div>'
                        +'<div class="list-group-item small">Padawans: ' + padawans +'</div>'
                        +'<div class="list-group-item small">Status: ' + dojo[0].responsibles[i].status +'</div>'
                        +'<a class="list-group-item" href="responsible.html?id_responsible=' + dojo[0].responsibles[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'</div>');
                }
                $('#listPanelEmployees').empty();
                for (var i=0;i<dojo[0].employees.length;i++) {
                    $('#listPanelEmployees').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].employees[i].id +'" data-parent="#menu">' + dojo[0].employees[i].lastname + ' ' + dojo[0].employees[i].name + '</a>'
                        +'<div id="' + dojo[0].employees[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].employees[i].dni +'</div>'
                        +'<div class="list-group-item small">Country: ' + dojo[0].employees[i].country +'</div>'
                        +'<div class="list-group-item small">State: ' + dojo[0].employees[i].state +'</div>'
                        +'<div class="list-group-item small">City: ' + dojo[0].employees[i].city +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].employees[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].employees[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].employees[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].employees[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].employees[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].employees[i].twitter +'</div>'
                        +'<div class="list-group-item small">Status: ' + dojo[0].employees[i].status +'</div>'
                        +'<a class="list-group-item" href="employee.html?id_employee=' + dojo[0].employees[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojo.removeEmployee(\'' + dojo[0].employees[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Employee</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getProjects : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/getProject.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listPanelProjects').empty();
                $('#infoProjects').text('Projects: '+list.length);
                for (var i=0;i<list.length;i++) {
                    var categories = '';
                    for (var j=0;j<list[i].categories.length;j++) {
                        if ((j+1)==list[i].categories.length)
                            categories = categories + list[i].categories[j].name;
                        else
                            categories = categories + list[i].categories[j].name + ', ';
                    }
                    var padawans = '';
                    for (var j=0;j<list[i].padawans.length;j++) {
                        if ((j+1)==list[i].padawans.length)
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>';
                        else
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>, ';
                    }
                    $('#listPanelProjects').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Category: ' + categories +'</div>'
                        +'<div class="list-group-item small">Description: ' + list[i].description +'</div>'
                        +'<div class="list-group-item small">Objective: ' + list[i].objective +'</div>'
                        +'<div class="list-group-item small">Why: ' + list[i].why +'</div>'
                        +'<div class="list-group-item small">Target: ' + list[i].target +'</div>'
                        +'<div class="list-group-item small">Scope: ' + list[i].scope +'</div>'
                        +'<div class="list-group-item small">Padawans: ' + padawans +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" href="project.html?id_project=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawanDojo : function () {
        this.setModalAddPadawan('Add Padawan');
        CTS.Utils.showModal('modalAddPadawan');
        this.setPadawans();
    },
    setModalAddPadawan : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddPadawan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawans" class="col-sm-2 control-label">Padawans</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="padawans" id="padawans"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Dojo.addPadawan();">Add Padawan</button>'
            +'      </div>');
    },
    setPadawans : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/padawan/getPadawan.php",
            cache: false,
            success: function (list) {
                $('#padawans').empty();

                for (var i=0;i<list.length;i++) {
                    $('#padawans').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#padawans").select2();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function () {
        var ids = {
                id_dojo: this.id_dojo,
                padawans: $("#padawans").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Utils.closeModal('modalAddPadawan');
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addMentorDojo : function () {
        this.setModalAddMentor('Add Mentor');
        CTS.Utils.showModal('modalAddMentor');
        this.setMentors();
    },
    setModalAddMentor : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddMentor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="mentors" class="col-sm-2 control-label">Mentors</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="mentors" id="mentors"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Dojo.addMentor();">Add Mentor</button>'
            +'      </div>');
    },
    setMentors : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/mentor/getMentor.php",
            cache: false,
            success: function (list) {
                $('#mentors').empty();

                for (var i=0;i<list.length;i++) {
                    $('#mentors').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                    $("#mentors").select2();
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addMentor : function () {
        var ids = {
                id_dojo: this.id_dojo,
                mentors: $("#mentors").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/addMentor.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue agregado correctamente");
                CTS.Utils.closeModal('modalAddMentor');
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addEmployeeDojo : function () {
        this.setModalAddEmployee('Add Employee');
        CTS.Utils.showModal('modalAddEmployee');
        this.setEmployees();
    },
    setModalAddEmployee : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="employees" class="col-sm-2 control-label">Employees</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="employees" id="employees"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Dojo.addEmployee();">Add Employee</button>'
            +'      </div>');
    },
    setEmployees : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/employee/getEmployee.php",
            cache: false,
            success: function (list) {
                $('#employees').empty();

                for (var i=0;i<list.length;i++) {
                    $('#employees').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                    $("#employees").select2();
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addEmployee : function () {
        var ids = {
                id_dojo: this.id_dojo,
                employees: $("#employees").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/addEmployee.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue agregado correctamente");
                CTS.Utils.closeModal('modalAddEmployee')
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removePadawan : function (id_padawan) {
        var ids = {
                id_dojo: this.id_dojo,
                id_padawan: id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/removePadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue removido correctamente.");
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removeMentor : function (id_mentor) {
        var ids = {
                id_dojo: this.id_dojo,
                id_mentor: id_mentor
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/removeMentor.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue removido correctamente.");
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removeEmployee : function (id_employee) {
        var ids = {
                id_dojo: this.id_dojo,
                id_employee: id_employee
            };
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/removeEmployee.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue removido correctamente.");
                CTS.Dojo.getMembers();
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
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Dojo.savePhoto();">Add Photo</button>'
            +'      </div>');
    },
    savePhoto : function () {
        var photo = $('#photo')[0].files[0];
        if (photo.size>1048576){
            CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","La foto debe pesar menos de 1 MB.");
        } else {
            var data = new FormData();
            data.append('photo', photo);
            data.append("id_contact", CTS.Dojo.dojo.id_contact);
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
                    CTS.Dojo.getDojo();
                },
                error: function () {
                    CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
                }
            });
        }   
    }
};

$(function () {
    CTS.Dojo.init();
});