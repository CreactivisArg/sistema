var CTS = CTS || {};

CTS.Logs = {
    id_skill : '',
    name_skill : '',
    init : function () {
        this.name_skill = CTS.Utils.getURLParameter('name_skill');
        $('#nameSkill').text(this.name_skill);
        this.id_skill = CTS.Utils.getURLParameter('id_skill');
        this.bindActions();
        this.getMembers();
    },
    bindActions : function () {
        var self = this;
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
    getMembers : function () {
        var id = {
                id_skill: this.id_skill
            };
        jQuery.ajax({
            type: "POST",
            url: "api/skill/getMembers.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (members) {
                $('#listPanelPadawans').empty();
                for (var i=0;i<members[0].padawans.length;i++) {
                    $('#listPanelPadawans').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + members[0].padawans[i].id +'" data-parent="#menu">' + members[0].padawans[i].lastname + ' ' + members[0].padawans[i].name + '</a>'
                        +'<div id="' + members[0].padawans[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item" href="padawan.html?id_padawan=' + members[0].padawans[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'</div>');
                }
                $('#listPanelMentors').empty();
                for (var i=0;i<members[0].mentors.length;i++) {
                    $('#listPanelMentors').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + members[0].mentors[i].id +'" data-parent="#menu">' + members[0].mentors[i].lastname + ' ' + members[0].mentors[i].name + '</a>'
                        +'<div id="' + members[0].mentors[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item" href="mentor.html?id_mentor=' + members[0].mentors[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'</div>');
                }
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