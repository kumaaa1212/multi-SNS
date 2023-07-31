import { jLeagueTeams } from '@/TeamData'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const CategoriesDetail = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>
    </div>
  )
}

export default CategoriesDetail

const getStaticPaths = async () => {
  const paths = jLeagueTeams.map((team) => ({
    params: { team: team.label }
  }))
  return { paths, fallback: false }
}