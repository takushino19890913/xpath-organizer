import React, {useEffect} from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const InspectCard: React.FC<{
}> = ({}) => {
    return(
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Inspect
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InspectCard;
