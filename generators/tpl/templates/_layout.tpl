<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
    {% xstyle "index" %}{% endxstyle %}
  </head>
  <body>
    {% block header %}
    header
    {% endblock %}

    <div id="app"></div>
    <section class="left">
      {% block left %}{% endblock %}
    </section>

    <section class="right">
      {% block right %}
      right
      {% endblock %}
    </section>

    {% xscript "vendor" %}{% endxscript %}
    {% xscript "index" %}{% endxscript %}

  </body>
</html>
