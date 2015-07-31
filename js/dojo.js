var CTS = CTS || {};

CTS.Dojo = {
    id_dojo : '',
    init : function () {
        $('#nameDojo').text(CTS.Utils.getURLParameter('name_dojo'));
        this.id_dojo = CTS.Utils.getURLParameter('id_dojo');
        this.bindActions();
        this.getMembers();
    },
    bindActions : function () {
        var self = this;
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
    },
    showPadawans : function () {
        $('#listPanelPadawans').show();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').hide();
        $('#tabPadawans').addClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').removeClass('active');
    },
    showMentors : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').show();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').hide();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').addClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').removeClass('active');
    },
    showResponsibles : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').show();
        $('#listPanelEmployees').hide();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').addClass('active');
        $('#tabEmployees').removeClass('active');
    },
    showEmployees : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').hide();
        $('#listPanelResponsibles').hide();
        $('#listPanelEmployees').show();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').removeClass('active');
        $('#tabResponsibles').removeClass('active');
        $('#tabEmployees').addClass('active');
    },
    getMembers : function () {
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/getMembers.php",
            data: 'id_dojo='+ this.id_dojo,
            cache: false,
            success: function(dojo) {  
                $('#listPanelPadawans').empty();
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
                    $('#listPanelPadawans').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].padawans[i].id +'" data-parent="#menu">' + dojo[0].padawans[i].lastname + ' ' + dojo[0].padawans[i].name + '</a>'
                        +'<div id="' + dojo[0].padawans[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].padawans[i].dni +'</div>'
                        +'<div class="list-group-item small">Birthdate: ' + dojo[0].padawans[i].birthdate +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].padawans[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].padawans[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].padawans[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].padawans[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].padawans[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].padawans[i].twitter +'</div>'
                        +'<div class="list-group-item small">School: ' + dojo[0].padawans[i].school +'</div>'
                        +'<div class="list-group-item small">Responsibles: ' + responsibles +'</div>'
                        +'<div class="list-group-item small">Projects: ' + projects +'</div>'
                        +'<div class="list-group-item small">Status: ' + dojo[0].padawans[i].status +'</div>'
                        +'<a class="list-group-item" href="padawan.html?id_padawan=' + dojo[0].padawans[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojo.removePadawan(\'' + dojo[0].padawans[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Padawan</a>'
                        +'</div>');
                }
                $('#listPanelMentors').empty();
                for (var i=0;i<dojo[0].mentors.length;i++) { 
                    $('#listPanelMentors').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].mentors[i].id +'" data-parent="#menu">' + dojo[0].mentors[i].lastname + ' ' + dojo[0].mentors[i].name + '</a>'
                        +'<div id="' + dojo[0].mentors[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">DNI: ' + dojo[0].mentors[i].dni +'</div>'
                        +'<div class="list-group-item small">Address: ' + dojo[0].mentors[i].address +'</div>'
                        +'<div class="list-group-item small">Phone: ' + dojo[0].mentors[i].phone +'</div>'
                        +'<div class="list-group-item small">Mobile: ' + dojo[0].mentors[i].mobile +'</div>'
                        +'<div class="list-group-item small">Email: ' + dojo[0].mentors[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + dojo[0].mentors[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + dojo[0].mentors[i].twitter +'</div>'
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
    addPadawanDojo : function () {
        this.setModalAddPadawan('Add Padawan');
        this.showModalAddPadawan();
        this.setPadawans();
    },
    closeModalAddPadawan : function () {
        $('#modalAddPadawan').modal('hide');
    },
    showModalAddPadawan : function () {
        $('#modalAddPadawan').modal('show');
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <label>Padawans:</label>'
            +'                   <select class="padawans-multiple" multiple="multiple" style="width: 80%" name="padawans" id="padawans">'
            +'                  </select>'
            +'          </div>'
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
                $(".padawans-multiple").select2();
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
                CTS.Dojo.closeModalAddPadawan();
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addMentorDojo : function () {
        this.setModalAddMentor('Add Mentor');
        this.showModalAddMentor();
        this.setMentors();
    },
    closeModalAddMentor : function () {
        $('#modalAddMentor').modal('hide');
    },
    showModalAddMentor : function () {
        $('#modalAddMentor').modal('show');
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <label>Mentors:</label>'
            +'                   <select class="mentors-multiple" multiple="multiple" style="width: 80%" name="mentors" id="mentors">'
            +'                  </select>'
            +'          </div>'
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
                    $(".mentors-multiple").select2();
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
                CTS.Dojo.closeModalAddMentor();
                CTS.Dojo.getMembers();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addEmployeeDojo : function () {
        this.setModalAddEmployee('Add Employee');
        this.showModalAddEmployee();
        this.setEmployees();
    },
    closeModalAddEmployee : function () {
        $('#modalAddEmployee').modal('hide');
    },
    showModalAddEmployee : function () {
        $('#modalAddEmployee').modal('show');
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <label>Employees:</label>'
            +'                   <select class="employees-multiple" multiple="multiple" style="width: 80%" name="employees" id="employees">'
            +'                  </select>'
            +'          </div>'
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
                    $(".employees-multiple").select2();
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
                CTS.Dojo.closeModalAddEmployee();
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
    }
};

$(function () {
    CTS.Dojo.init();
});