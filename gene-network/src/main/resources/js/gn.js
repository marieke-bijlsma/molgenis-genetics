$(function () {
    var form = $('#gavin-form');
    var jobHrefRegex = /.+\/([^\/]+)/;

    if (form.length) {
        React.render(molgenis.ui.UploadContainer({
            'id': 'gavin-fileupload',
            'url': '/plugin/diagnostics/annotate-file',
            'type': 'file',
            'name': 'gavin-uploader',
            'width': '12',
            onSubmit: function (jobHref) {
                if ((match = jobHrefRegex.exec(jobHref)) !== null) {
                    location.replace(molgenis.getContextUrl() + "/result/" + match[1]);
                }
            },
            validExtensions: ['.vcf', '.vcf.gz', '.tsv', '.tsv.gz', '.txt', '.txt.gz', '.tab', 'tab.gz'],
            showNameFieldExtensions: ['.vcf', '.vcf.gz', '.tsv', '.tsv.gz', '.txt', '.txt.gz', '.tab', 'tab.gz'],
            maxFileSizeMB: 50 //estimated "clean VCF size" (not too much annotations/INFO fields) of an exome
        }), form[0]);
    } else {
        $('#gavin-view').on('click', '.glyphicon-cog', function (e) {
            var formNode = $('#form')[0];
            var annotator = $(e.target).data('name');
            React.unmountComponentAtNode(formNode);
            React.render(molgenis.ui.Form({
                entity: 'sys_set_' + annotator,
                entityInstance: annotator,
                mode: 'edit',
                modal: true,
                enableOptionalFilter: false,
                enableFormIndex: false,
                onSubmitSuccess: function () {
                    location.reload();
                }
            }), formNode);
        });
    }
});