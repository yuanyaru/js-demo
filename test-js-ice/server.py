import sys, Ice
import Demo
import os

 
class PrinterI(Demo.Printer):
    def printString(self, s, current=None):
        print s
        with open("test.sh", "w") as f:
            f.write(s)
            f.close()
        os.system("./test.sh")
 
 
with Ice.initialize(sys.argv) as communicator:
    adapter = communicator.createObjectAdapterWithEndpoints("SimplePrinterAdapter", "default -p 10000")
    object = PrinterI()
    adapter.add(object, communicator.stringToIdentity("SimplePrinter"))
    adapter.activate()
    communicator.waitForShutdown()
