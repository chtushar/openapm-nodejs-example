# openAPM Instrumentation Example for Nodejs + MySQL 

What does this do?
This fires up a node js express server that has a few endpoints that are instrumented using openAPM package.

This also runs a simulator that sends requests to the above web server at 100 RPM. The web server further writes to an instance of MySQL.

Specify your MySQL Database details in the [docker-compose](./docker-compose.yaml)

This exposes instrumented metrics on port 9097 at the /metrics endpoint.

The prometheus running in agent mode scrapes the aforementioned endpoint and pushes the data to the configured levitate instance.

You can either browse the data directly on the Embedded Grafana in your Levitate account or add your levitate instance's read url as a datasource in your existing Grafana setup.