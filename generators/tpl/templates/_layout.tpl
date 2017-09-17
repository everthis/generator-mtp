<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    {% xstyle "index" %}{% endxstyle %}
  </head>
  <body>
    {% block header %}
    This is the default content
    {% endblock %}
    
    <div id="app"></div>
    <section class="left">
      {% block left %}{% endblock %}
    </section>

    <section class="right">
      {% block right %}
      This is more content
      {% endblock %}
    </section>

    {% xscript "vendor" %}{% endxscript %}
    {% xscript "index" %}{% endxscript %}

  </body>
</html>
