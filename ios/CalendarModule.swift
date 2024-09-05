// CalendarModule.swift
import CoreNFC

@objc(CalendarModule)
class CalendarModule: NSObject {

 @objc(addEvent:location:date:)
 func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
   print("Event Name: \(name)")
   print("Event Location: \(location)")
   print("Event Date (timestamp): \(date)")
 }

  @objc(addEventBis)
 func addEventBis() -> Void {
   print("Event2");
 }

 @objc
 func constantsToExport() -> [String: Any]! {
   return ["someKey": "someValue"]
 }

 @objc(cardSessionSample)
    func cardSessionSample() {
        /// A place-holder function for APDU processing. In a real app,
        /// process the received data and return a response as Data.
        let ProcessAPDU: (_: Data) -> Data = { capdu in return Data() }
        
        Task() {
            // Proceed only if the current device and system are able and
            // eligible to use CardSession.
            guard NFCReaderSession.readingAvailable,
                CardSession.isSupported,
                await CardSession.isEligible else {
                print("CardSession is not supported or not eligible.")
                return
            }
        
            // Hold a presentment intent assertion reference to prevent the
            // default contactless app from launching. In a real app, monitor
            // presentmentIntent.isValid to ensure the assertion remains active.
            var presentmentIntent: NFCPresentmentIntentAssertion?


            let cardSession: CardSession
            do {
                presentmentIntent = try await NFCPresentmentIntentAssertion.acquire()
                cardSession = try await CardSession()
            } catch {
                /// Handle failure to acquire NFC presentment intent assertion or
                /// card session.
                return
            }
            
            // Iterate over events as the card session produces them.
            for try await event in cardSession.eventStream {
                switch event {
                case .sessionStarted:
                    cardSession.alertMessage = String(localized: "Communicating with card reader.")
                    break
                    
                case .readerDetected:
                    /// Start card emulation on first detection of an external reader.
                    try await cardSession.startEmulation()
                    
                case .readerDeselected:
                    /// Stop emulation on first notification of RF link loss.
                    await cardSession.stopEmulation(status: .success)
                    
                case .received(let cardAPDU):
                    do {
                        /// Call handler to process received input and produce a response.
                        let responseAPDU = ProcessAPDU(cardAPDU.payload)
                        
                        try await cardAPDU.respond(response: responseAPDU)
                    } catch {
                        /// Handle the error from respond(response:). If the error is
                        /// CardSession.Error.transmissionError, then retry by calling
                        /// CardSession.APDU.respond(response:) again.
                    }
                    
                case .sessionInvalidated(reason: _):
                    cardSession.alertMessage = String(localized: "Ending communication with card reader.")
                    /// Handle the reason for session invalidation.
                    break
                }
            }
            
            presentmentIntent = nil /// Release presentment intent assertion.
        }
    }

}
