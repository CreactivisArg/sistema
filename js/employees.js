var CTS = CTS || {};

CTS.Employees = {
    init : function () {
        this.bindActions();
        this.getEmployees();
    },
    bindActions : function () {
        var self = this;
        // setNewEmployee
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewEmployee();
        });
    },
    getEmployees : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/employee/getEmployee.php",
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
                        +'<a class="list-group-item" href="employee.html?id_employee=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Employees.editEmployee(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editEmployee : function (id) {
        this.setModalEmployee('Edit Employee', id);
        CTS.Utils.showModal('modalEditEmployee');
        this.setEmployee(id);
    },
    setModalEmployee : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Employees.saveEmployee(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Employees.newEmployee();">Save changes</button>';

        $('#holderModal').empty().append(
        '<!-- Modal -->'
        +'<div class="modal fade" id="modalEditEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
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
        +           saveBtn
        +'      </div>');
    },
    setEmployee : function (id) {
        var id = {
                id_employee: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/employee/getEmployee.php",
            data: JSON.stringify(id),
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
    saveEmployee : function (id) {
        var employee = {
                id_employee: id,
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
            url: "api/employee/updateEmployee.php",
            data: JSON.stringify(employee),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue editado correctamente");
                CTS.Utils.closeModal('modalEditEmployee');
                CTS.Employees.getEmployees();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewEmployee : function () {
        this.setModalEmployee('New Employee', null);
        CTS.Utils.showModal('modalEditEmployee');
        CTS.Utils.setStatus(null,'status');
    },
    newEmployee : function () {
        var employee = {
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
            url: "api/employee/newEmployee.php",
            data: JSON.stringify(employee),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue creado correctamente.");
                CTS.Utils.closeModal('modalEditEmployee');
                CTS.Employees.getEmployees();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Employees.init();
});