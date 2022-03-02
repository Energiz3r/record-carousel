
import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles((theme)=>({
  tileMain: {
    padding: '1rem',
    //backgroundColor: '#bdbdbd',

    //background: 'radial-gradient(at 50% 20%, #f7e2c1, #d9c8b0, #47423b)',
    background: 'radial-gradient(at 50% 20%, #faf8d9, #e6e4c8, #555554)', 
    //background: 'radial-gradient(at 50% 20%, #faf8d9, #e6e4c8, #b5b59c)', 

    //transform: "rotate3d(1, 1, 1, -45deg)",
    minWidth: '30rem',
    height: '15rem',
    display: 'flex',
    flexDirection: 'row',
    color: 'black'
  },
  albumImageContainer: {
    display: 'flex',
  },
  albumInfoContainer: {
    padding: '0.5rem',
  },
  albumTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  artistLabel: {
    fontWeight: 200,
  },
  releaseDateLabel:{
    fontSize: '.8rem',
    fontWeight: 200,
  },
  albumImage: {
    width: '10rem',
    margin: 'auto'
  }
}));

export type Album = {
  sku: number,
  title: string,
  artist: string,
  releaseDate: string,
  description: string
}

const Tile = ({
  sku,
  title,
  artist,
  releaseDate,
  description,
}: Album, rotation:number): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles({ theme: Object }); 
    return(
        <div className={classes.tileMain} style={{transform: "rotate3d(1, 1, 1, " + rotation + "deg)"}}>
            <div className={classes.albumImageContainer}>
                <img className={classes.albumImage} src={process.env.PUBLIC_URL + "/albums/" + sku + ".png"}/>
            </div>
            
            <div className={classes.albumInfoContainer}>
              <p className={classes.albumTitle}>{title}</p>
              <p className={classes.artistLabel}>{artist}</p>
              <p>{description.length > 250 ? description.substring(0,250) + "..." : description}</p>
              <p className={classes.releaseDateLabel}>Released: {releaseDate}</p>
            </div>
            
        </div>
    )
}
export default Tile