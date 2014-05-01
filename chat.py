import termios, fcntl, sys, os, serial, time, smtplib
ser = serial.Serial('/dev/tty.usbserial-A9014F2U', 9600, writeTimeout = 0)
time.sleep(2)


fd = sys.stdin.fileno()

oldterm = termios.tcgetattr(fd)
newattr = termios.tcgetattr(fd)
newattr[3] = newattr[3] & ~termios.ICANON & ~termios.ECHO
termios.tcsetattr(fd, termios.TCSANOW, newattr)

oldflags = fcntl.fcntl(fd, fcntl.F_GETFL)
fcntl.fcntl(fd, fcntl.F_SETFL, oldflags | os.O_NONBLOCK)

try:
    while 1:

        try:
            c = sys.stdin.read(1)
            ser.write(c)
            print 'keypress: ' + c
        except IOError: pass
finally:
    termios.tcsetattr(fd, termios.TCSAFLUSH, oldterm)
    fcntl.fcntl(fd, fcntl.F_SETFL, oldflags)


