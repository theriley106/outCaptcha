intexit() {
    kill -HUP -$$
}

hupexit() {
    echo
    echo "Interrupted"
    exit
}

trap hupexit HUP
trap intexit INT

./mitmweb --no-http2 -p 8084 -s ./mitmProxyTest.py &
./main.py &

wait
