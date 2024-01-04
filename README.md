## "2D Time Encoded Password"

### Overview

This document presents a novel concept for enhancing password security by introducing a temporal dimension to password entry. This approach involves measuring and encoding the time intervals between keystrokes as part of the password.

### Key Concept

- **Basic Idea**: Alongside the traditional password characters, the system records the time gaps between each keystroke.
- **Encoding Method**: These time intervals are converted into Unicode characters from the [Private Use Area Block (U+E000 - U+F8FF)](https://unicodeplus.com/block/E000).

### Purpose

- **Enhanced Security**: This method adds a layer of security by incorporating the rhythm of typing. It counters risks such as shoulder surfing or photo capturing of keystrokes since it's not just about what is typed but also how it is typed in terms of timing.

### Technical Implementation

- **Granularity Setting**: The user can define the granularity of time measurement (e.g., 0.25 seconds). Keystrokes within the same time frame are encoded as the same Unicode character.
- **Unicode Encoding**: The time between keystrokes is encoded as an offset from U+E001, based on the measured time and granularity.
- **Password Example**:
  - Traditional Password: "Mike"
  - Typing Rhythm: M (1s pause) - i (0.25s pause) - k (0.25s pause) - e
  - Granularity: 0.25 seconds
  - Encoded Password: M[U+E004]i[U+E005]k[U+E006]e (with cumulative time tally) or M[U+E004]i[U+E001]k[U+E001]e (without cumulative time tally)

### Compatibility and Use Cases

- **Compatibility**: This scheme is compatible with any system supporting Unicode, such as HTTPS posts to APIs or databases that support Unicode characters in the Private Use Area Block.
- **Fallback for Non-Unicode Systems**: For systems not supporting Unicode, a mapping function in the API can re-encode the time factor.
- **Adjustable Granularity**: The granularity can be varied to suit different needs, e.g., shorter for automated systems, longer for users with challenges in maintaining a consistent typing rhythm.

### Implementation Details

- **Source Code Location**: The implementation is in `src\components\header.js`.
- **Nature of Implementation**: It's a reference implementation crafted from a Gatsby Template, not a library, and can be compiled as a standalone Electron app.
- **Backspace Handling**: The system records the use of backspace, encoding it in the Private Use Area Block, allowing for strong passwords that are visibly blank.

### Future Directions

- **Further Documentation**: Additional documentation and enhancements are planned for this implementation.
