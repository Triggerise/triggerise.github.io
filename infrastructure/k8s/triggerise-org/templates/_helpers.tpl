{{/*
Common labels
*/}}
{{- define "labels" -}}
app: {{.Release.Name | quote }}
release: {{.Release.Name | quote }}
team: {{ (index .Chart.Maintainers 0).Name | quote }}
{{- end }}
