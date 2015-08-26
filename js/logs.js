var CTS = CTS || {};

CTS.Logs = {
    id_dojo : '',
    name_dojo : '',
    init : function () {
        this.name_dojo = CTS.Utils.getURLParameter('name_dojo');
        $('#nameDojo').text(this.name_dojo);
        this.id_dojo = CTS.Utils.getURLParameter('id_dojo');
        this.bindActions();
        this.getLogs();
    },
    bindActions : function () {
        var self = this;
        $('#newLog').on('click', function () {
            self.addLog();
        });
        $('#showPadawans').on('click', function () {
            self.showPadawans();
        });
        $('#showMentors').on('click', function () {
            self.showMentors();
        });
    },
    showPadawans : function () {
        $('#listPanelPadawans').show();
        $('#listPanelMentors').hide();
        $('#tabPadawans').addClass('active');;
        $('#tabMentors').removeClass('active');
    },
    showMentors : function () {
        $('#listPanelPadawans').hide();
        $('#listPanelMentors').show();
        $('#tabPadawans').removeClass('active');;
        $('#tabMentors').addClass('active');
    },
    getLogs : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/log/getLog.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (dojo) {
                $('#listPanelPadawans').empty();
                for (var i=0;i<dojo[0].padawans.length;i++) {
                    $('#listPanelPadawans').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#padawan_' + dojo[0].padawans[i].id +'" data-parent="#menu">' + dojo[0].padawans[i].padawan_lastname + ' ' + dojo[0].padawans[i].padawan_name + ' - ' + dojo[0].padawans[i].date + '</a>'
                        +'<div id="padawan_' + dojo[0].padawans[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item" onclick="CTS.Logs.deleteLog('+ dojo[0].padawans[i].id + ',null)"><span class="glyphicon glyphicon-remove"></span> Delete</a>'
                        +'</div>');
                }
                $('#listPanelMentors').empty();
                for (var i=0;i<dojo[0].mentors.length;i++) {
                    $('#listPanelMentors').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#mentor_' + dojo[0].mentors[i].id +'" data-parent="#menu">' + dojo[0].mentors[i].mentor_lastname + ' ' + dojo[0].mentors[i].mentor_name + ' - ' + dojo[0].mentors[i].date + '</a>'
                        +'<div id="mentor_' + dojo[0].mentors[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item" onclick="CTS.Logs.deleteLog(null,' + dojo[0].mentors[i].id + ')"><span class="glyphicon glyphicon-remove"></span> Delete</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setModal : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalLog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawans" class="col-sm-2 control-label">Padawans</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="padawans" id="padawans"></select></div></div>'
            +'              <div class="form-group"><label for="mentors" class="col-sm-2 control-label">Mentors</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="mentors" id="mentors"></select></div></div>'
            +'              <div class="form-group"><label for="date" class="col-sm-2 control-label">Date</label><div class="col-sm-10"><input id="date" type="date" class="form-control"></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Logs.newLog();">Save</button>'
            +'      </div>');
    },
    addLog : function () {
        this.setModal('New Log');
        CTS.Utils.showModal('modalLog');
        this.setPadawans();
        this.setMentors();
    },
    newLog : function () {
        var log = {
                id_dojo: this.id_dojo,
                date: $("#date").val(),
                padawans: $("#padawans").val(),
                mentors: $("#mentors").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/log/addLog.php",
            data: JSON.stringify(log),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El log fue creado correctamente.");
                CTS.Utils.closeModal('modalLog');
                CTS.Logs.getLogs();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    deleteLog : function (log_padawan,log_mentor) {
        var id = log_padawan ? {log_padawan: log_padawan} : {log_mentor: log_mentor};
        jQuery.ajax({
            type: "POST",
            url: "api/log/deleteLog.php",
            data: JSON.stringify(id),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El log fue borrado correctamente.");
                CTS.Logs.getLogs();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setPadawans : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: JSON.stringify(id),
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
    setMentors : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/mentor/getMentor.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#mentors').empty();

                for (var i=0;i<list.length;i++) {
                    $('#mentors').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#mentors").select2();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Logs.init();
});