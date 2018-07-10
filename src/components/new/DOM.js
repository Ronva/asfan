import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Frame from '../../assets/legend-frame.png';
import Bar from '../../assets/separator-bar.png';

export default () => (
  <Fragment>
    <Card raised className="whatsNew">
      <CardMedia component="img" src={Frame} style={{ width: 'auto', height: '240pt' }} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Legendary Card Frame
            </Typography>
        <Typography component="p">
          "As we roll out more details and sneak-peaks of Dominaria, you'll see that the set focuses heavily on the many legendary characters of the world—heroes past and present—and gameplay was designed to highlight them in cool new ways. Heck, the tagline is "Gather Legends"! With how relevant they were to playing the format, we wanted a clear visual indicator to make it clear at a glance which cards were legendary and which weren't. We landed on a crown-like embellishment around the title bar of the card; it extends into the card's black border in a really striking and regal way. We were so happy with it that we've decided to use it outside of the block on all legendary cards (other than planeswalkers—they look different enough already) going forward."
            </Typography>
      </CardContent>
    </Card>
    <Card raised className="whatsNew">
      <CardMedia component="img" src={Bar} style={{ width: 'auto', height: '240pt' }} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Separator Bar
        </Typography>
        <Typography component="p">
          "One of the quirky things about Magic cards is that reminder text and flavor text both use the exact same font, from the inception of modern reminder text way back in 1996's Mirage all the way through today. While not using additional fonts or treatments has kept cards very clean-looking, it has often been hard to tell where rules end and flavor begins. Newer players sometimes bleed rules and flavor together, not knowing where one ends and the other begins, and veterans sometimes miss second or third abilities sandwiched between italicized sentences.
          <br />
This has bugged us for a while, and we looked at a bunch of alternatives, including graying out flavor text, using a different typeface for one or the other, or putting a shaded box around one or the other to separate them at a glance. Ultimately, we decided to go back to our old bag of tricks, borrowing something from the original Portal (the 1997 set, not the upcoming phone app)—a simple bar, centered in the text box between rules and flavor."
        </Typography>
      </CardContent>
    </Card>
  </Fragment>
);