import React from 'react'
import { Grid } from '@mui/material'
import styled from './Article.module.scss'
interface Props {
  children: React.ReactNode
}

const ArticleArea = (props: Props): JSX.Element => {
  const { children } = props

  return (
    <div className={styled.main}>
      <Grid container className={styled.card_area} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={1} sm={1} md={1} key={index}>
            <div className={styled.main_children}>{children}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ArticleArea
