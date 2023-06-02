import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { TextField, Divider, Icon } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { CustomSummarizeButton } from '../../../components/CustomButton/CustomSummarizeButton';
import { ParagraphProgress } from '../../../components/ParagraphProgress/ParagraphProgress';
import { makeStyles } from '@mui/styles'
import absSumAPI from '../../../api/absSumAPI';
import { CustomTextField } from '../../../components/CustomTextField/CustomTextField';
import { json } from 'stream/consumers';

const useStyles = makeStyles({
  root: {
    ".MuiCard-root": {
      borderRadius: '20px',
    },
    height: '100%',
  },
  headerGrid: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  inputGrid: {
    width: '100%',
    height: '100%',
    padding: '1rem'
  },
  inputContainer: {
    height: '100%'
  },
  footerContainer: {
    height: '15%'
  },
  leftFooterContainer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  rightFooterContainer: {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  footerGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    paddingRight: '0.5rem',
    fontWeight: '600px',
    fontHeight: '24px',
    fontSize: '18px',
  },
  summarizeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
})

const inputLabel = "Enter or paste your text and press \"Summarize\""
const introText = "The Summarizer condenses articles, papers, and other documents into a bulleted Key Sentences list or into a new paragraph"
export const Summarizer: React.FC = () => {
  const classes = useStyles()
  const [inputText, setInputText] = React.useState<string>("")
  const [outputText, setOutputText] = React.useState<string>("")
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)

  async function postSummaryAPI() {
    const summary = await absSumAPI(inputText)
    console.log(summary.out)
    setOutputText(summary.out)
    setIsProcessing(false)
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: "20px", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)' }} className={classes.root}>
      <Grid container sx={{ height: '80%' }}>
        <Grid item xs={12} className={classes.headerGrid}>
          <div className={classes.title}>
            <p className={classes.textTitle}>Summarizer</p>
            <Tooltip title={introText} arrow placement="top">
              <InfoOutlinedIcon color='primary' fontSize='small' />
            </Tooltip>
          </div>
        </Grid>
        <Divider sx={{ width: '100%' }} />
        <Grid container className={classes.inputContainer}>
          <Grid item xs={6} className={classes.inputGrid}>
            {/* First section */}
            <CustomTextField
              variant="outlined"
              multiline
              placeholder={inputLabel}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
          <Grid item xs={6} className={classes.inputGrid}>
            {/* Second section */}
            {outputText === "" ?
              <ParagraphProgress isProcessing={isProcessing} numProgress={3} />
              : <CustomTextField
                variant="outlined"
                multiline
                value={outputText}
              />}
          </Grid>
        </Grid>
        <Grid container className={classes.footerContainer}>
          <Grid item xs={6}>
            <Grid container className={classes.leftFooterContainer}>
              <Grid item xs={6}>
                <div>
                  Upload articles
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.summarizeButton}>
                  <CustomSummarizeButton
                    color='primary'
                    disabled={isProcessing}
                    onClick={() => {
                      try {
                        setOutputText("")
                        setIsProcessing(true)
                        postSummaryAPI()
                      } catch (err) {
                        console.log(err)
                      }
                    }}>
                    Summarize
                  </CustomSummarizeButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
          <Grid item xs={6} className={classes.rightFooterContainer}>
            {/* Second section */}
            Second section
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
