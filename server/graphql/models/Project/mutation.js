import raven from 'raven'

import {GraphQLNonNull, GraphQLString} from 'graphql'
import {GraphQLURL} from 'graphql-custom-types'
import {GraphQLError} from 'graphql/error'

import {userCan} from '../../../../common/util'
import {parseQueryError} from '../../../../server/db/errors'
import {update as updateProject, findProjectByNameForPlayer} from '../../../db/project'

import {ThinProject} from './schema'

const sentry = new raven.Client(process.env.SENTRY_SERVER_DSN)

export default {
  setProjectArtifactURL: {
    type: ThinProject,
    args: {
      projectName: {type: new GraphQLNonNull(GraphQLString)},
      url: {type: new GraphQLNonNull(GraphQLURL)},
    },
    async resolve(source, {projectName, url}, {rootValue: {currentUser}}) {
      if (!userCan(currentUser, 'updateProject')) {
        throw new GraphQLError('You are not authorized to do that.')
      }
      try {
        const project = await findProjectByNameForPlayer(projectName, currentUser.id)
        project.artifactURL = url
        const result = await updateProject(project, {returnChanges: true})
        if (result.replaced) {
          return result.changes[0].new_val
        }
        throw new GraphQLError('Failed to update project artifactURL')
      } catch (err) {
        const error = parseQueryError(err)
        sentry.captureException(error)
        throw error
      }
    }
  },
}
