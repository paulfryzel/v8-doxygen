# v8-doxygen

V8 documentation scripts for [v8.paulfryzel.com](http://v8.paulfryzel.com)

## Usage

```shell
$ ./v8-doxygen/scripts/run <branch> <doxyfile>
```

## Notes

The scripts run nightly on an f1-micro [GCE](https://cloud.google.com/compute) instance with doxygen 1.8.x.

The cron entry is as follows:

```shell
0 0 * * * /home/paulfryzel/v8-doxygen/scripts/run master master > /home/paulfryzel/master.log 2>&1
```

## License

MIT
