# 2D time encoded password

## Reference implementation for a new conceptual implementation of a typed password.

Conceptually, the user types characters as they would for any password.  As they are typing, the gaps of time in between the key strokes are measured and encoded as unicode characters in the unicode Private Use Area Block U+E000 - U+F8FF  https://unicodeplus.com/block/E000

This allows the user to tap a 'rhythmn' encoded by time along with their password. i.e. if someone looks over their shoulder or captures their password in a photo while they are typing it, the would be spy wouldn't capture the timbre or rhythmn of 'how' the pasword is typed, only 'what' was typed.  This addin a dimension of time to the complexity of a password.

The Unicode character an offset from U+E001 plus the absolute value of the measured keystroke time in seconds divided by the user definable granularity.  i.e. if the granularity is set to 0.25 seconds, any keystroke gap length measured within the same quarter of one second will be considered the same length for the purposes of unicode encoding.  The count of the granularity is embedded in the password character string by the timer function resulting in a password similar to below:

### Example

Password: Mike

Rhythmn: M-1 second pause-i-0.25 second pause-i-0.25 second pause
Granularity 0.25 seconds

Resultant password: M[U+E004]i[U+E005]k[U+E006]e

It can also be encoded without the cumulative time tally

Resultant password: M[U+E004]i[U+E001]k[U+E001]e

The scheme is plug and play with any existing Unicode capable transport mechanism (https post to an API for example), and any backend database that supports unicode characters in the Private Use Area Block.  In the case of a non Unicode compliant database, a mapping function in the API call for instance can be used to re-encode the time factor as needed.

All of the relevant code is in src\components\header.js.  This is not a library.  It's a hacked together working reference implementation from a Gatsby Template, compilable as a standalone electron app to illustrate a concept.  More documentation to follow...

deleteContentBackward allows for the user to 'backspace' their password until it is visibly blank.  However the code keylogs the backspace and encodes it in the Private Use Area Block, effectively allowing for a visibly zero length strong password.

Granularity can be adjusted to allow for different use cases.  Extremely short granularity for machine driven systems, longer for people with impediments to accurately typing a rhythymn.